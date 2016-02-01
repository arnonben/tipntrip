'use strict';

/**
 * @ngdoc directive
 * @name tipntripApp.directive:ngLogout
 * @description
 * # ngLogout
 */
<<<<<<< HEAD
 angular.module('tipntripApp')
 .directive('ngLogout',['Auth','$location',function (Auth,$location) {
  return {
    template: '<div ng-click="logout()">Logout</div>',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
    },
    controller: function(Auth,$scope,$location){
     $scope.logout = function() { Auth.$unauth()};
   }
 }
}]);
angular.module('tipntripApp').directive('ngLogout', ['$rootScope', 'Auth', function ($rootScope, Auth) {
        return {
            template: '<div ng-click="logout()">Logout</div>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
            },
            controller: function (Auth, $scope) {
                $scope.logout = function () {
                    $rootScope.$broadcast('logout');
                    Auth.$unauth();
                    console.log('this logout');
                };
            }
        }
    }]);
