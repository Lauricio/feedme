Template.CMSdishes.helpers({
  dishes: function () {
    // return Dishes.find({}, {sort: {createdAt: -1}})
     return Session.get('keywords') ? Dishes.searchByName(Session.get('keywords'),{sort: {createdAt: -1}}): Dishes.find({}, {sort: {createdAt: -1}});
  }
});

Template.CMSdishes.events({
  'click .js-addNewDish': function () {
    Dishes.insert({
      _id: Random.id(),
      thaiName:'',
      englishName: '',
      picture: '',
      timesOrdered: 0,
      offeredBy: [],
      createdAt: new Date()
    }, function (err, id) {
      Session.set('editingDishId', id)
      Session.set("newDishOpen", true);
    })
  }
});

Template.cmsDishItem.events({
  'click .js-deleteDishes': function () {
    var self = this;
    if (confirm('Are you sure you want to delete this dish?')) {
      Session.set("newDishOpen", false);
      Dishes.remove({_id: self._id})
      
    }
  },
  'click .js-editDish': function (e, t) {
    Session.set('editingDishId', this._id)
    Session.set("newDishOpen", true);
  }
})

Template.addDish.helpers({
  openState: function () {
    return Session.equals('newDishOpen', true) ? 'is-open' : '';
  },
  editableDish: function () {
    return Session.get('editingDishId') ? Dishes.findOne({_id: Session.get('editingDishId')}) : {}
  }
})

Template.addDish.events({
  'change .js-uploadPicture': function (e, t) {
    var file = e.target.files[0];
    var fr = new FileReader();
    fr.onload = function (e) {
      var newImg = e.target.result;
      if (newImg)
        Dishes.update({_id: Session.get('editingDishId')}, {$set: {picture: newImg}})
      
    }
    fr.readAsDataURL(file);
  },
  'click .js-closeModal': function (e, t) {
    Session.set("newDishOpen", false);
  },
  'click .js-saveDish': function (e, t) {
    var thaiName = t.find('#editDishThaiName').value;
    var englishName = t.find('#editDishEngName').value;
    Dishes.update({_id: this._id}, {$set: {
      thaiName: thaiName,
      englishName: englishName
    }});
    Session.set('newDishOpen', false)
  }
});


Template.selectDish.helpers({
  openState: function () {
    return Session.equals('addDishToMealOpen', true) ? 'is-open' : '';
  },
  dishesToSelect: function () {
    return Session.get('keywords') ? Dishes.searchByName(Session.get('keywords')): Dishes.find({}, {sort: {createdAt: -1}});
  }
});

Template.selectDish.events({
  'click .js-closeSelectDish': function () {
    Session.set('addDishToMealOpen', false)
  }
});

Template.dishesForAddingToMeal.helpers({
  alreadyAddedInMeal: function () {
    var self = this;
    var index = 0;
    var meal = Meals.findOne({_id: Session.get('activeMeal')})
    if (meal)
      index = _.indexOf(_.pluck(meal.dishes, 'dish'), self._id); 
    return index < 0 ? false : true;
  }  
})

Template.dishesForAddingToMeal.events({
  'click .js-addToMeal': function () {
    var self = this;
    var meal = Meals.findOne({_id: Session.get('activeMeal')})
    var index = _.indexOf(_.pluck(meal.dishes, 'dish'), self._id);
    console.log(index)
    if (index < 0) {
      Meals.update({_id: meal._id}, {$addToSet: {dishes: {dish: self._id, dishOptions: []}}});
      Meteor.call('addDishToAttending', meal._id, self._id)
      
    }
    // var modifier = {$pull: {}};
    // modifier.$pull["dishes"] = meal.dishes[index];
    // Meteor.call('removeMealAttending', meal._id, self._id )
    // Meals.update({_id: meal._id}, modifier);
  }
})
