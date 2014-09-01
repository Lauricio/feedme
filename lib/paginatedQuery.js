PaginatedQuery = function( query, perPage, subName, sortFields) {
  this._loading = true;
  this._loadedTimes = 0;
  this._loadingListeners = new Deps.Dependency();

  this.query = query ? query : {};
  this._queryListiners = new Deps.Dependency();

  this.perPage = perPage ? perPage : 0;
  this.subName = subName ? subName : '';
  this.sortFields = sortFields ? sortFields : {_id: 1};

  this._limit = perPage;
  this._limitListeners = new Deps.Dependency();
  this._loaded = 0;
  this._loadedListeners = new Deps.Dependency();

//  total records on collection
  this._total = perPage;
}

PaginatedQuery.prototype.getQuery = function() {

  this._queryListiners.depend();
  return this.query;
}

PaginatedQuery.prototype.getSubName = function() {

  this._queryListiners.depend();
  return this.subName;
}


PaginatedQuery.prototype.loaded = function() {

  this._loadedListeners.depend();
  return this._loaded;
}

PaginatedQuery.prototype.loading = function() {

  this._loadingListeners.depend();
  return this._loading;
}

PaginatedQuery.prototype.limit = function() {

  this._limitListeners.depend();
  return this._limit;
}

PaginatedQuery.prototype.ready = function() {

  return this.loaded() === this.limit() && this._total >= this.limit();
}


PaginatedQuery.prototype.loadNextPage = function() {
  this._loading = true;
  this._loadingListeners.changed();

  Session.set('loaderOn', true);
  this._limit += this.perPage;
  this._limitListeners.changed();
  Deps.flush();
}

PaginatedQuery.prototype.updateRecords = function () {

}

PaginatedQuery.prototype.done = function() {

  var collectioName = this.subName;
  var sorting = this.sortFields;
  this._total = Collection[collectioName].find(this.query,{fields:{_id:1}}).count()


  if (this._loaded === this._limit) {
    var newCursor = Collection[collectioName].find(this.query,{sort: sorting, fields:{_id:1, scrollerReady: 1}, skip: this._loaded, limit: this._limit });
  } else {
    var newCursor = Collection[collectioName].find(this.query,{sort: sorting, fields:{_id:1, scrollerReady: 1}, limit: this._limit });
  }

  newCursor.forEach(function (item) {

    Collection[collectioName]._collection.update({_id: item._id},
      {$set: {scrollerReady: true}})
  })


  this._loaded = this._limit > this._total ? this._total : this._limit;

  this._loadedListeners.changed();

  this._loading = false;
  this._loadingListeners.changed();
  Session.set('loaderOn', false)

  this._loadedTimes ++;

}

PaginatedQuery.prototype.reset = function(perPage) {
  if (perPage === this._limit)
    return true;

  var collectioName = this.subName;


  var newCursor = Collection[collectioName]._collection.find({scrollerReady: true}, function (err) {
      if(err)
        console.log(err)
  });

  newCursor.forEach(function (item) {
    Collection[collectioName]._collection.update({_id: item._id},
      {$set: {scrollerReady: false}}, function (err) {
        if (err)
          console.log(err)
      })
  });

  this.perPage = perPage ? perPage : 5;
  this._limit = this.perPage;
  this._limitListeners.changed();
  this._loaded = 0;
  this._total = perPage;
  this._loadedListeners.changed();

}

PaginatedQuery.prototype.asign = function(query, perPage, subName) {

  this.query = query || "";
  this.subName = subName || "";
  this._queryListiners.changed();

  this.reset(perPage)

}
