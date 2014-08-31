Template.menu.events({
  'click .js-goToProfileSettings': function () {
    Router.go('/profileSettings')
  },
  'click .js-goToDishesCMS': function () {
    Router.go('/CMSdishes')
  }
})