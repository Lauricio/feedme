Template.ingredients.helpers({
  openState: function () {
    return Session.equals('gridOpen', true) ? 'is-open' : '';
  }
})

Session.setDefault('gridOpen', false)

Template.dishItem.events({
  'click .js-openGrid': function (e) {
      Session.toggle('gridOpen');
  }
});

Template.ingredients.events({
  'click .js-selectIngredient' : function (e, t) {
    Session.toggle('gridOpen');
  }
});