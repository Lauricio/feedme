Template.dishItem.helpers({
  dish: function () {
    return Dishes.findOne({_id: this.dish})
  },
  mealOptions: function () {
    console.log(this)
    console.log(UI._parentData(1))
    var meal = UI._parentData(1);
    return meal && meal.dishOptions ? meal.dishOptions : []
  }
});

Template.dishItem.events({
  'click .js-openGrid': function (e) {
      Session.toggle('gridOpen');
  }
});

Template.ingredients.helpers({
  openState: function () {
    return Session.equals('gridOpen', true) ? 'is-open' : '';
  }
})

Session.setDefault('gridOpen', false)

Template.ingredients.events({
  'click .js-selectIngredient' : function (e, t) {
    Session.toggle('gridOpen');
  }
});