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
  });

});