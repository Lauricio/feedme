Meteor.autorun(function () {
  Meteor.setInterval( function () {
    var nextWeek = moment(new Date()).add(7, 'd').format('YYYY-MM-DD')
    if (!Days.findOne({day: nextWeek}) ) {
      
    }
  }, 3000)
})
