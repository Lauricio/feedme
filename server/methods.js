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
    var day = moment(meal.day, 'YYYY-MM-DD').format('dddd').toLowerCase();
    var dayHelper = 0;
    switch (day) {
      case 'monday':
        dayHelper = 0;
      break;
      case 'tuesday':
        dayHelper = 1;
      break;
      case 'wenesday':
        dayHelper = 2;
      break;
      case 'thursday':
        dayHelper = 3;
      break;
      case 'friday':
        dayHelper = 4;
      break;
      case 'saturday':
        dayHelper = 5;
      break;
      case 'sunday':
        dayHelper = 6;
      break;
    }

    var users = Meteor.users.find({eating: true});

    users.forEach(function (user) {
      if (user && user.profile.days[dayHelper][meal.mealType].food) {
        Attending.update({mealId: mealId, owner: user._id}, { $addToSet: {myMeals: {dish: dishId, eating: true}}
        }, function (err, res) {
          if (err)
            console.log('%c err   ',  'background: #B3CC57; color: white; padding: 1px 15px 1px 5px;', err);
          else
            console.log('%c res   ',  'background: #B3CC57; color: white; padding: 1px 15px 1px 5px;', res);
        })
      }
    })
  }
})