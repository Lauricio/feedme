Days = new Meteor.Collection('days')
Meals = new Meteor.Collection('meals')
Attending = new Meteor.Collection('attending')
Dishes = new Meteor.Collection('dishes')
MeteorUsers = Meteor.users;
if (Meteor.isClient) {

  GroundDB(Dishes)
  GroundDB(MeteorUsers)
  GroundDB(Attending)
  GroundDB(Meals)
  GroundDB(Days)
}