angular.module("journeyApp", ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './views/home.html',
      controller: 'homeCtrl'
    })

    .state('position', {
      url: '/position/:positionID',
      templateUrl: './views/position.html',
      controller: 'positionCtrl'
    });

});