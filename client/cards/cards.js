Template.cards.helpers({
  dayCards: function () {
    return Meals.find()
  }
})

Template.cardsList.helpers({
  whoIsEating: function () {
    return Attending.find({mealId: this._id})
  }
})