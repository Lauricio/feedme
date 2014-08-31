Meteor.users.allow({
  insert: function (userId) {
    return true;
  },
  update: function (userId, fields, doc, modifier) {
    if (fields['_id'] === userId)
      return true;
  },
  remove: function (userId) {
    return false
  },
  fetch : ['_id', 'favoritedBy']
});