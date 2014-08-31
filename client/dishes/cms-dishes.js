Template.CMSdishes.helpers({

});

Template.CMSdishes.events({
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
  }
})


Template.CMSdishes.events({
  'click .js-editDish': function (e, t) {
    Session.toggle("newDishOpen");
  }
});

Template.addDish.helpers({
  openState: function () {
    return Session.equals('newDishOpen', true) ? 'is-open' : '';
  }
})

Template.addDish.events({
  'click .js-closeModal': function (e, t) {
    Session.set("newDishOpen", false);
  }
});