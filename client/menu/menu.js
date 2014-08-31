Template.menu.events({
  'click .js-goToProfileSettings': function () {
    Router.go('/profileSettings')
  },
  'click .js-goToDishesCMS': function () {
    Router.go('/CMSdishes')
  },
  'click .js-goToTodayPage': function () {
    var todayFormated = moment(new Date()).format('YYYY-MM-DD')
    Session.set('activeDay', todayFormated)
    Router.go('/home')
  }
})