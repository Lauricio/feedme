Template.searchDishesByName.events({
  'keyup #searchForDishes': function (e, template) {
    e.preventDefault();
    e.stopPropagation();
    Session.set('searching', true)
    if(e.currentTarget.value){
      if(e.currentTarget.value.length >= 3){
        Session.set('keywords', e.currentTarget.value);
      }
    } else {
      Session.set('searching', false)
      Session.set('keywords', null);
    }
  },
  'click .js-clearSearch': function (e, t) {
    e.preventDefault();
    e.stopPropagation();
    var temp = t.find('#searchForDishes');
    temp.value = '';
    Session.set('searching', false)
    Session.set('keywords', null);

  }
})