Template.CMSdishes.helpers({
  dishes: function () {
    return Dishes.find()
  }
});

Template.CMSdishes.events({
  'click .js-addNewDish': function () {
    Dishes.insert({
      _id: Random.id(),
      thaiName:'',
      englishName: '',
      picture: '',
      timesOrdered: 0,
      offeredBy: []
    }, function (err, id) {
      Session.set('editingDishId', id)
    })
  },
  'click .js-editDish': function (e, t) {
    Session.set('editingDishId', this._id)
    Session.toggle("newDishOpen");
  }
})

Template.addDish.helpers({
  openState: function () {
    return Session.equals('newDishOpen', true) ? 'is-open' : '';
  },
  editableDish: function () {
    return Session.get('editingDishId') ? Dishes.findOne({_id: Session.get('editingDishId')}) : {}
  }
})

Template.addDish.events({
  'change .js-uploadPicture': function (e, t) {
    var file = e.target.files[0];
    if (file)
    console.log(file)
    // if (confirm('All Attendees will be delete, Continue ?')) {
      var fr = new FileReader();
      fr.onload = function (e) {
        console.log('%c e   ',  'background: #B3CC57; color: white; padding: 1px 15px 1px 5px;', e.target.result);
        
      }
      fr.readAsDataURL(file);
  },
  'click .js-closeModal': function (e, t) {
    Session.set("newDishOpen", false);
  }
});