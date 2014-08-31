Meteor.startup(function () {
  Days.remove({})
  Meteor.users.remove({})
  Dishes.remove({})
  Attending.remove({})
  Meals.remove({});
if (Meteor.users.find().count() == 0) {

  var today = new Date();
  var todayFormated = moment(today).format('YYYY-MM-DD');


   Meals.insert({
      _id: "Meal0001",
      day: todayFormated,
      time: '10:00',
      owner: 'notSet',
      dishes: [{dish: 'Dish0001', dishOptions: []}, 
      {dish: 'Dish0002', dishOptions: ['chicken']}]
    })

  var users = [
      {name:"Sa",email:"view@example.com",roles:['cook']},
      {name:"moderator",email:"moderator@email.io",roles:['moderator']},
      {name:"admin",email:"admin@email.io",roles:['admin']}
    ];

  _.each(users, function (user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: "apple1",
      profile: { name: user.name }
    });

    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come 
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles);
    }

    Attending.insert({
      day: todayFormated,
      owner: id,
      mealId: 'Meal0001',
      myMeals: [{dish: 'Dish0001', eating: true}, {dish: 'Dish0002', eating: true}]
    })

  });


  if (Days.find().count() === 0) {
    
    Days.insert({
      date: today,
      day: todayFormated
    });

    Dishes.insert({
      _id: 'Dish0001',
      thaiName:'ต้มยำ',
      englishName: 'Tom Yam',
      picture: 'http://imgur.com/WDgcp6h.jpg',
      timesOrdered: 0,
      offeredBy: []
    });

    Dishes.insert({
      _id: 'Dish0002',
      thaiName:'ต้มยำ',
      englishName: 'Pad Thai',
      picture: 'http://www.qualitylivinginchiangmai.com/wp-content/uploads/2012/08/pad-thai.jpg',
      timesOrdered: 0,
      offeredBy: []
    });




  }
}

})