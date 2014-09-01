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
  'click .js-clearIngredients': function () {
    if (confirm('Would you like to remove all ingredients from this dish?')) {
      var self = this;

      var meal = UI._parentData(1);

      var index = _.indexOf(_.pluck(meal.dishes, 'dish'), Session.get('activeDishId'));
      var modifier = {$set: {}};

      modifier.$set["dishes." + index ] = {dish: self._id, dishOptions: []};

      Meals.update({_id: meal._id}, modifier);

    }
  },
  'click .js-openGrid': function (e) {
      if (Session.equals('gridOpen', false)) {
        Session.set('activeDishId', this._id)
        Session.set('activeMealId', UI._parentData(1)._id)
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
      Meteor.call('removeMealAttending', meal._id, self._id )
      Meals.update({_id: meal._id}, modifier);
    }

  }
});

Session.setDefault('gridOpen', false)
Template.ingredients.helpers({
  openState: function () {
    return Session.equals('gridOpen', true) ? 'is-open' : '';
  }
})


Template.ingredients.events({
  'click .js-selectIngredientFish' : function (e, t) {
    Session.toggle('gridOpen');
    var self = this;
    var meal = Meals.findOne({_id: Session.get('activeMealId')})
    var index = _.indexOf(_.pluck(meal.dishes, 'dish'), Session.get('activeDishId'));
    var modifier = {$addToSet: {}};
    modifier.$addToSet["dishes." + index + ".dishOptions"] = 'fish';
    Meals.update({_id: meal._id}, modifier);
  },
  'click .js-selectIngredientPork' : function (e, t) {
    Session.toggle('gridOpen');
    var self = this;
    var meal = Meals.findOne({_id: Session.get('activeMealId')})
    var index = _.indexOf(_.pluck(meal.dishes, 'dish'), Session.get('activeDishId'));
    var modifier = {$addToSet: {}};
    modifier.$addToSet["dishes." + index + ".dishOptions"] = 'pork';
    Meals.update({_id: meal._id}, modifier);
  },
  'click .js-selectIngredientSeafood' : function (e, t) {
    Session.toggle('gridOpen');
    var self = this;
    var meal = Meals.findOne({_id: Session.get('activeMealId')})
    var index = _.indexOf(_.pluck(meal.dishes, 'dish'), Session.get('activeDishId'));
    var modifier = {$addToSet: {}};
    modifier.$addToSet["dishes." + index + ".dishOptions"] = 'seafood';
    Meals.update({_id: meal._id}, modifier);
  },
  'click .js-selectIngredientShrimp' : function (e, t) {
    Session.toggle('gridOpen');
    var self = this;
    var meal = Meals.findOne({_id: Session.get('activeMealId')})
    var index = _.indexOf(_.pluck(meal.dishes, 'dish'), Session.get('activeDishId'));
    var modifier = {$addToSet: {}};
    modifier.$addToSet["dishes." + index + ".dishOptions"] = 'shrimp';
    Meals.update({_id: meal._id}, modifier);
  },
  'click .js-selectIngredientChicken' : function (e, t) {
    Session.toggle('gridOpen');
    var self = this;
    var meal = Meals.findOne({_id: Session.get('activeMealId')})
    var index = _.indexOf(_.pluck(meal.dishes, 'dish'), Session.get('activeDishId'));
    var modifier = {$addToSet: {}};
    modifier.$addToSet["dishes." + index + ".dishOptions"] = 'chicken';
    Meals.update({_id: meal._id}, modifier);
  },
  'click .js-selectIngredientMushroom' : function (e, t) {
    Session.toggle('gridOpen');
    var self = this;
    var meal = Meals.findOne({_id: Session.get('activeMealId')})
    var index = _.indexOf(_.pluck(meal.dishes, 'dish'), Session.get('activeDishId'));
    var modifier = {$addToSet: {}};
    modifier.$addToSet["dishes." + index + ".dishOptions"] = 'mushroom';
    Meals.update({_id: meal._id}, modifier);
  },
  'click .js-closeModal' : function (e, t) {
    Session.set('gridOpen', false);
  }
});