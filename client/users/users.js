Template.users.helpers({
  itIsMe: function () {
    return this.owner === Meteor.userId() ? true : false
  }
});

Template.userItem.helpers({
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
  'click .js-disableEat': function () {
    var self = this;
    var record =  UI._parentData()
    Attending.update({_id: record._id}, {$pull: {myMeals: self}}, function (err, res) {
      if (!err) {
        Attending.update({_id: record._id}, {$addToSet: {myMeals: {dish: self.dish, eating: false}}})
        
      }
    })
  },
  'click .js-enableEat': function () {
    var self = this;
    console.log('%c self   ',  'background: #B3CC57; color: white; padding: 1px 15px 1px 5px;', self);
    var record =  UI._parentData()
    Attending.update({_id: record._id}, {$pull: {myMeals: self}}, function (err, res) {
      if (!err) {
        Attending.update({_id: record._id}, {$addToSet: {myMeals: {dish: self.dish, eating: true}}})
        
      }
    })
  },
})