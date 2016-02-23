'use strict';

/**
 * @ngdoc overview
 * @name tipntrip2App
 * @description
 * # tipntrip2App
 *
 * Main module of the application.
 */
angular
  .module('tipntrip2App', [
    'ngResource',
    'ui.router',
    'firebase'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
     $stateProvider
            // route to show our basic find (/find)
        .state('app', {
            url: '/app',
            controller: 'findController',
            views:{
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/find.html',
                        controller  : 'SearchController'
                    },
                    'footer': {
                      templateUrl : 'views/footer.html',
                    }
            }
        })
        
        
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/find/step1)
        .state('app.step1', {
            url: '/step1',
            templateUrl: 'views/find_step1.html'
        })
        
        // url will be /find/step2
        .state('app.step2', {
            url: '/step2',
            templateUrl: 'views/find_step2.html'
        })
        
        // url will be /find/step3
        .state('app.step3', {
            url: '/step3',
            templateUrl: 'views/find_step3.html'
        })
  
  .state('app.step4', {
            url: '/step4',
            templateUrl: 'views/find_step4.html'
        })
  
  .state('app.summary', {
            url: '/summary',
            templateUrl: 'views/find_summary.html'
        })
  
  .state('login', {
                url:'/login',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/login.html',
                        controller  : 'SigninController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
         })
  
  .state('signin', {
                url:'/signin',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/sigin.html',
                        controller  : 'RegisterController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
         });
       
    // catch all route
    // send users to the find page 
    $urlRouterProvider.otherwise('/app/step1');
  });
