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
  }
})