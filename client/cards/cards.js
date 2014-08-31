Template.cards.helpers({
  currentDay: function () {
    return moment(Session.get('activeDay'), 'YYYY-MM-DD').format('dddd, MMMM Do')
  },
  dayCards: function () {
    return Meals.find()
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

Template.cardsList.helpers({
  whoIsEating: function () {
    return Attending.find({mealId: this._id})
  }
})