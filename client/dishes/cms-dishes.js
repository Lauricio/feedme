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