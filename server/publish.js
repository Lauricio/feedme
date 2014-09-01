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
});

 Meteor.publish("searchDishes", function(keyword) {
  // if (this.userId && keyword) {
    // console.log('%c keyword   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
    mongoDbArr = [];
    mongoDbArr.push({thaiName: { $regex : keyword, $options:"i" } });
    mongoDbArr.push({englishName: { $regex : keyword, $options:"i" } });
    return Dishes.find({ $or: mongoDbArr}, {limit: 15})
  // }
 });