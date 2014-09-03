Meteor.startup(function () {
if (Meteor.users.find().count() == 0) {

  var today = new Date();
  var todayFormated = moment(today).format('YYYY-MM-DD');
  Days.insert({
    date: today,
    day: todayFormated
  });

  var users = [
      {name:"Sa",email:"chef@tapfuse.io",roles:['cook']},
    ];

  _.each(users, function (user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: "123456",
      profile: {fullName: user.name}
    });

    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come 
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles);
    }


      Dishes.insert({
        _id: 'FruitMeal0000001',
        thaiName:'ผลไม้',
        englishName: 'Fruits',
        picture: 'http://www.d-thaifruit.com/images/fruit-tray.jpg',
        timesOrdered: 0,
        offeredBy: []
      });
    })
  }

})


  // Days.remove({})
  // Meteor.users.remove({})
  // Dishes.remove({})
  // Attending.remove({})
  // Meals.remove({});
// if (Meteor.users.find().count() == 0) {

//   var today = new Date();
//   var todayFormated = moment(today).format('YYYY-MM-DD');


//    Meals.insert({
//       _id: "Meal0001",
//       day: todayFormated,
//       time: '10:00',
//       mealType: 'breakfast',
//       owner: 'notSet',
//       dishes: [{dish: 'Dish0001', dishOptions: []}, 
//       {dish: 'Dish0002', dishOptions: ['chicken']}],
//       sort: 1
//     });

//    Meals.insert({
//       _id: "Meal0002",
//       day: todayFormated,
//       time: '15:00',
//       mealType: 'lunch',
//       owner: 'notSet',
//       dishes: [{dish: 'Dish0001', dishOptions: []}, 
//       {dish: 'Dish0002', dishOptions: ['chicken']}],
//       sort: 2
//     });

//    Meals.insert({
//       _id: "Meal0003",
//       day: todayFormated,
//       time: '18:00',
//       mealType: 'dinner',
//       owner: 'notSet',
//       dishes: [{dish: 'Dish0001', dishOptions: []}, 
//       {dish: 'Dish0002', dishOptions: ['chicken']}],
//       sort: 3
//     })

//     // Attending.insert({
//     //   day: moment(new Date()).format('YYYY-MM-DD'),
//     //   owner: id,
//     //   mealId: 'Meal0001',
//     //   myMeals: [{dish: 'Dish0001', eating: true}, {dish: 'Dish0002', eating: true}],
//     //   disabled: false
//     // })

//   });


//   if (Days.find().count() === 0) {
    
//     Days.insert({
//       date: today,
//       day: todayFormated
//     });

//     Dishes.insert({
//       _id: 'Dish0001',
//       thaiName:'ต้มยำ',
//       englishName: 'Tom Yam',
//       picture: 'http://imgur.com/WDgcp6h.jpg',
//       timesOrdered: 0,
//       offeredBy: []
//     });

//     Dishes.insert({
//       _id: 'Dish0002',
//       thaiName:'ต้มยำ',
//       englishName: 'Pad Thai',
//       picture: 'http://www.qualitylivinginchiangmai.com/wp-content/uploads/2012/08/pad-thai.jpg',
//       timesOrdered: 0,
//       offeredBy: []
//     });

//     Dishes.insert({
//       _id: 'FruitMeal0000001',
//       thaiName:'ผลไม้',
//       englishName: 'Fruits',
//       picture: 'http://www.d-thaifruit.com/images/fruit-tray.jpg',
//       timesOrdered: 0,
//       offeredBy: []
//     });


//   }