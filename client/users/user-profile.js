Template.profileSettings.events({
  'change .js-addYourPhoto': function (e, t) {
    var file = e.target.files[0];
      var fr = new FileReader();
      fr.onload = function (e) {
        Meteor.users.update({_id: Meteor.userId()}, {$set: {picture: e.target.result}})
        
      }
      fr.readAsDataURL(file);
  },
  'click .js-enableFruit': function () {
    var modifier = {$set: {}};
    modifier.$set["profile.days." + this.day + '.' + this.mealType +".fruit"] = true
    modifier.$set["profile.days." + this.day + '.' + this.mealType +".food"] = false
    modifier.$set["profile.days." + this.day + '.' + this.mealType +".notEating"] = false
    Meteor.users.update({_id: Meteor.userId()}, modifier)
  },
  'click .js-disableFruit': function () {
    var modifier = {$set: {}};
    modifier.$set["profile.days." + this.day + '.' + this.mealType +".fruit"] = false;
    Meteor.users.update({_id: Meteor.userId()}, modifier)
  },
  'click .js-enableFood': function () {
    var modifier = {$set: {}};
    modifier.$set["profile.days." + this.day + '.' + this.mealType +".food"] = true
    modifier.$set["profile.days." + this.day + '.' + this.mealType +".fruit"] = false
    modifier.$set["profile.days." + this.day + '.' + this.mealType +".notEating"] = false
    Meteor.users.update({_id: Meteor.userId()}, modifier)
  },
  'click .js-disableFood': function () {
    var modifier = {$set: {}};
    modifier.$set["profile.days." + this.day + '.' + this.mealType +".food"] = false;
    Meteor.users.update({_id: Meteor.userId()}, modifier)
  },
  'click .js-enableEating': function () {
    var modifier = {$set: {}};
    modifier.$set["profile.days." + this.day + '.' + this.mealType +".notEating"] = false;
    Meteor.users.update({_id: Meteor.userId()}, modifier)
  },
  'click .js-disableEating': function () {
    var modifier = {$set: {}};
    modifier.$set["profile.days." + this.day + '.' + this.mealType +".notEating"] = true;
    modifier.$set["profile.days." + this.day + '.' + this.mealType +".fruit"] = false;
    modifier.$set["profile.days." + this.day + '.' + this.mealType +".food"] = false;
    Meteor.users.update({_id: Meteor.userId()}, modifier)
  },
})