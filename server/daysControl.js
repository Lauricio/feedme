function UpdateAttending (dayHelper, day, mealId, mealType) {
  var users = Meteor.users.find({eating: true});
  users.forEach(function (user) {

    if (user && !user.profile.days[dayHelper][mealType].notEating) {
      if (user.profile.days[dayHelper][mealType].food) {
        Attending.insert({
          day: day,
          owner: user._id,
          mealId: mealId,
          myMeals: [],
          disabled: false
        })
      } else if (user.profile.days[dayHelper][mealType].fruit) {
        Attending.insert({
          day: day,
          owner: user._id,
          mealId: mealId,
          myMeals: [{dish: 'FruitMeal0000001', dishOptions: [], eating: true}],
          disabled: false
        })
      }
      
    }
  })
}


Meteor.autorun(function () {
  Meteor.setInterval( function () {
    var nextWeek = moment(new Date()).add(7, 'd').format('YYYY-MM-DD')
    if (!Days.findOne({day: nextWeek}) ) {
      Days.insert({
        date: new Date(),
        day: nextWeek
      })

      var day = moment(nextWeek, 'YYYY-MM-DD').format('dddd').toLowerCase();
      var dayHelper = 0;
      switch (day) {
        case 'monday':
          dayHelper = 0;
        break;
        case 'tuesday':
          dayHelper = 1;
        break;
        case 'wednesday':
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


      Meals.insert({
        day: nextWeek,
        time: '10:00',
        mealType: 'breakfast',
        owner: 'notSet',
        dishes: [],
        sort: 1
      }, function (err, mealId) {
        if (!err && mealId) {
          UpdateAttending( dayHelper, nextWeek, mealId, 'breakfast')
        }
      });

      Meals.insert({
        day: nextWeek,
        time: '15:00',
        mealType: 'lunch',
        owner: 'notSet',
        dishes: [],
        sort: 2
      }, function (err, mealId) {
        if (!err && mealId) {
          UpdateAttending( dayHelper, nextWeek, mealId, 'lunch')
        }
      });

      Meals.insert({
        day: nextWeek,
        time: '19:00',
        mealType: 'dinner',
        owner: 'notSet',
        dishes: [],
        sort: 3
      }, function (err, mealId) {
        if (!err && mealId) {
          UpdateAttending( dayHelper, nextWeek, mealId, 'dinner')
        }
      });      

    }
  }, 86400000)
});


Meteor.methods({
  startApp: function () {
    for (i = 1; i < 8; i++) {
      var nextWeek = moment(new Date()).add(i, 'd').format('YYYY-MM-DD')
      if (!Days.findOne({day: nextWeek}) ) {
        Days.insert({
          date: new Date(),
          day: nextWeek
        })

        var day = moment(nextWeek, 'YYYY-MM-DD').format('dddd').toLowerCase();
        var dayHelper = 20;
        switch (day) {
          case 'monday':
            dayHelper = 0;
          break;
          case 'tuesday':
            dayHelper = 1;
          break;
          case 'wednesday':
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


        Meals.insert({
          day: nextWeek,
          time: '10:00',
          mealType: 'breakfast',
          owner: 'notSet',
          dishes: [],
          sort: 1
        }, function (err, mealId) {
          if (!err && mealId) {
            UpdateAttending( dayHelper, nextWeek, mealId, 'breakfast')
          }
        });

        Meals.insert({
          day: nextWeek,
          time: '15:00',
          mealType: 'lunch',
          owner: 'notSet',
          dishes: [],
          sort: 2
        }, function (err, mealId) {
          if (!err && mealId) {
            UpdateAttending( dayHelper, nextWeek, mealId, 'lunch')
          }
        });

        Meals.insert({
          day: nextWeek,
          time: '19:00',
          mealType: 'dinner',
          owner: 'notSet',
          dishes: [],
          sort: 3
        }, function (err, mealId) {
          if (!err && mealId) {
            UpdateAttending( dayHelper, nextWeek, mealId, 'dinner')
          }
        });      

      }
    }
  }
})
