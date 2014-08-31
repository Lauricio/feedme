Meteor.methods({
  removeMealAttending: function (mealId, dishId) {
    var removingDishT = {
      dish: dishId,
      eating: true
    }
    var removingDishF = {
      dish: dishId,
      eating: false
    }

    Attending.update({mealId: mealId}, {$pull: {myMeals: removingDishF}}, {multi: true})
    Attending.update({mealId: mealId}, {$pull: {myMeals: removingDishT}}, {multi: true})
  },
  addDishToAttending: function (mealId, dishId) {
    var meal = Meals.findOne({_id: mealId})
    var users = Meteor.users.find({chef: {$ne: true}})
    users.forEach(function (user) {
      if (user) {
        
      }
    })
  }
})