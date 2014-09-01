// Template.users.helpers({
//   itIsMe: function () {
//     return this.owner === Meteor.userId() ? true : false
//   }
// });

Template.userItem.helpers({
  user: function () {
    return Meteor.users.findOne({_id: this.owner})
  },
 dishPicture: function () {
  var picture = Dishes.findOne({_id: this.dish});
  return picture && picture.picture ? picture.picture : ''
 }
});

Template.userItemPersonal.helpers({
  dishPicture: function () {
   var picture = Dishes.findOne({_id: this.dish});
   return picture && picture.picture ? picture.picture : ''
  }
});

Template.userItemPersonal.events({
  'click .js-removeFromEating': function () {
    Attending.update({_id: this._id}, {$set: {disabled: true}})
  },
  'click .js-enableEating': function () {
    Attending.update({_id: this._id}, {$set: {disabled: false}})
  },
  'click .js-disableEat': function () {
    var self = this;
    var record =  UI._parentData()
    var record =  UI._parentData()

    var index = _.indexOf(_.pluck(record.myMeals, 'dish'), self.dish);
    var modifier = {$set: {}};
    modifier.$set["myMeals." + index + ".eating"] = false;

    Attending.update({_id: record._id}, modifier)
  },
  'click .js-enableEat': function () {
    var self = this;
    var record =  UI._parentData()
    var index = _.indexOf(_.pluck(record.myMeals, 'dish'), self.dish);
    var modifier = {$set: {}};
    modifier.$set["myMeals." + index + ".eating"] = true;

    Attending.update({_id: record._id}, modifier)
  },
})