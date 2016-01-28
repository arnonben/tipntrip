'use strict';

/**
 * @ngdoc directive
 * @name tipntripApp.directive:ngLogout
 * @description
 * # ngLogout
 */
angular.module('tipntripApp')
  .directive('ngLogout',['Auth',function (Auth) {
    return {
      template: '<div ng-click="logout()">Logout</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      },
      controller: function(Auth,$scope){
      	$scope.logout = function() { Auth.$unauth(); };      		
      }
    }
}]);