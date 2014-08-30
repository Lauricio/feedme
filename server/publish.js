Meteor.publish('days', function (day) {
  return Days.find()
});

Meteor.publish('attending', function (day) {
  return Attending.find()
})

Meteor.publish('dishes', function (day) {
  return Dishes.find()
})

Meteor.publish('meals', function (day) {
  return Meals.find()
});

Meteor.publish('users', function (day) {
  return Meteor.users.find()
})