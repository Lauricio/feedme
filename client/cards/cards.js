Template.cards.helpers({
  currentDay: function () {
    return moment(Session.get('activeDay'), 'YYYY-MM-DD').format('dddd, MMMM Do')
  },
  dayCards: function () {
    return Meals.find({day: Session.get('activeDay')}, {sort: {sort: 1}})
  }
});

Template.cards.events({
  'click .js-goDayBack': function () {
    Session.set('activeDay', moment(Session.get('activeDay'), 'YYYY-MM-DD').subtract(1, 'd').format('YYYY-MM-DD'))
  },
  'click .js-goDayForward': function () {
    Session.set('activeDay', moment(Session.get('activeDay'), 'YYYY-MM-DD').add(1, 'd').format('YYYY-MM-DD'))
  }
})
picker = {};

// Template.cards.rendered = function () {
//    var $input = $('#selectDate').pickadate()

//    // Use the picker object directly.
//    picker = $input.pickadate('picker')
//   console.log('%c picker   ',  'background: #B3CC57; color: white; padding: 1px 15px 1px 5px;', picker);
//   picker.on({
//     open: function() {
//         console.log('Opened up!')
//     },
//     close: function() {
//         console.log('Closed now')
//     },
//     render: function() {
//         console.log('Just rendered anew')
//     },
//     stop: function() {
//         console.log('See ya')
//     },
//     set: function(thingSet) {
//         console.log('Set stuff:', thingSet)
//     }
//   })

// };
Template.cardsList.helpers({
  whoIsEating: function () {
    return Attending.find({mealId: this._id, disabled: false, owner: {$ne: Meteor.userId()}})
  },
  myAttendance: function () {
    return Attending.findOne({mealId: this._id, owner: Meteor.userId()})
  }
});

Template.cardsList.events({
  'click .js-addNewDishToMeal': function () {
    Session.set('activeMeal', this._id)
    Session.set('addDishToMealOpen', true)
  }
})