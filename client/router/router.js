PaginationHandles = {};
PaginationHandles.dishes = new PaginatedQuery({ }, 20, 'Dishes', {createdAt: 1});

Router.map( function () {

  this.route('login', { 
    path: '/',
    layoutTemplate: 'layout',
    template: 'login',
    onBeforeAction: function () {
      if (Meteor.userId())
        Router.go('/home')
    }
  });

  this.route('login', { 
    path: '/login',
    layoutTemplate: 'layout',
    template: 'login',
  });

  this.route('home', { 
    path: '/home',
    layoutTemplate: 'layout',
    template: 'cards',
    yieldTemplates: {
      'menu': {to: 'menuTop'}
    },
    onBeforeAction: function () {
      var todayFormated = moment(new Date()).format('YYYY-MM-DD')
      Session.set('activeDay', todayFormated)
    }
  });

  this.route('CMSdishes', { 
    path: '/CMSdishes',
    layoutTemplate: 'layout',
    template: 'CMSdishes',
    yieldTemplates: {
      'menu': {to: 'menuTop'}
    }
  });

  this.route('profileSettings', { 
    path: '/profileSettings',
    layoutTemplate: 'layout',
    template: 'profileSettings',
    yieldTemplates: {
      'menu': {to: 'menuTop'}
    }
  });

});