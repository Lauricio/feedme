Template.dishItem.helpers({
  dish: function () {
    return Dishes.findOne({_id: this.dish})
  },
  mealOptions: function () {
    var meal = UI._parentData(1);
    return meal && meal.dishOptions ? meal.dishOptions : []
  }
});

Template.dishItem.events({
  'click .js-openGrid': function (e) {
      if (Session.equals('gridOpen', false)) {
    console.log(this)
        Session.set('activeDish', this._id)
      }
      Session.toggle('gridOpen');
  },
  'click .js-removeDishFromMeal': function () {
    var self = this;
    var dishName = Meteor.user().chef ? self.thaiName: self.englishName;
    if (confirm('Do you want to remove - ' + dishName + ' from the meal?')) {
      var meal = UI._parentData(1);
      var index = _.indexOf(_.pluck(meal.dishes, 'dish'), self._id);
      var modifier = {$pull: {}};
      modifier.$pull["dishes"] = meal.dishes[index];
      console.log('%c modifier   ',  'background: #B3CC57; color: white; padding: 1px 15px 1px 5px;', modifier);
      Meteor.call('removeMealAttending', meal._id, self._id )
      Meals.update({_id: meal._id}, modifier);
    }

  }
});

Template.ingredients.helpers({
  openState: function () {
    return Session.equals('gridOpen', true) ? 'is-open' : '';
  }
})

Session.setDefault('gridOpen', false)

Template.ingredients.events({
  'click .js-selectIngredientFish' : function (e, t) {
    Session.toggle('gridOpen');
    var self = this;
    var meal = UI._parentData(1);
    var index = _.indexOf(_.pluck(meal.dishes, 'dish'), Session.get('activeDish'));
    var modifier = {$addToSet: {}};
    modifier.$addToSet["dishes." + index + ".dishOptions"] = 'fish';
    Meals.update({_id: meal._id}, modifier);
  },
  'click .js-selectIngredientPork' : function (e, t) {
    Session.toggle('gridOpen');
    var self = this;
    var meal = UI._parentData(1);
    var index = _.indexOf(_.pluck(meal.dishes, 'dish'), Session.get('activeDish'));
    var modifier = {$addToSet: {}};
    modifier.$addToSet["dishes." + index + ".dishOptions"] = 'pork';
    Meals.update({_id: meal._id}, modifier);
  },
  'click .js-selectIngredientSeafood' : function (e, t) {
    Session.toggle('gridOpen');
    var self = this;
    var meal = UI._parentData(1);
    var index = _.indexOf(_.pluck(meal.dishes, 'dish'), Session.get('activeDish'));
    var modifier = {$addToSet: {}};
    modifier.$addToSet["dishes." + index + ".dishOptions"] = 'seafood';
    Meals.update({_id: meal._id}, modifier);
  },
  'click .js-selectIngredientShrimp' : function (e, t) {
    Session.toggle('gridOpen');
    var self = this;
    var meal = UI._parentData(1);
    var index = _.indexOf(_.pluck(meal.dishes, 'dish'), Session.get('activeDish'));
    var modifier = {$addToSet: {}};
    modifier.$addToSet["dishes." + index + ".dishOptions"] = 'shrimp';
    Meals.update({_id: meal._id}, modifier);
  },
  'click .js-selectIngredientChicken' : function (e, t) {
    Session.toggle('gridOpen');
    var self = this;
    var meal = UI._parentData(1);
    var index = _.indexOf(_.pluck(meal.dishes, 'dish'), Session.get('activeDish'));
    var modifier = {$addToSet: {}};
    modifier.$addToSet["dishes." + index + ".dishOptions"] = 'chicken';
    Meals.update({_id: meal._id}, modifier);
  }
});