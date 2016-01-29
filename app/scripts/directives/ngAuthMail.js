'use strict';

/**
 * @ngdoc directive
 * @name tipntripApp.directive:ngAuthMail
 * @description
 * # ngAuthMail
 */
angular.module('tipntripApp')
  .directive('ngAuthMail',['Auth', '$timeout', function (Auth, $timeout) {
    return {
      template: '<div>{{username}}</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      },
      controller: function(Auth,$scope){
      	$scope.authData = Auth.$getAuth();
      	if($scope.authData){
	      	$scope.username = $scope.authData.password.email;
      	}
      }
    };
  }]);