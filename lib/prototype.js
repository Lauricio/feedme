if (Meteor.isClient) {
  Session.clear = function (sessionName) {
    delete Session.keys[sessionName]
  }

  Session.toggle = function (sessionName) {
    Session.set(sessionName, Session.get(sessionName) ? false : true)
  }

  Session.toggleVal = function (sessionName, value1, value2) {
    Session.set(sessionName, Session.equals(sessionName, value1) ? value2 : value1)
  }


  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '');
  };
  }
};


String.prototype.truncate = function (options) {
  var length = (options && options.length) || 70;
  var ending = (options && options.ending) || "...";
  var truncated = this.slice(0, length);

  if (truncated.length < this.length)
    truncated += ending;

  return truncated;
};
