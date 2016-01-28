'use strict';

/**
 * @ngdoc directive
 * @name tipntripApp.directive:findNavbar
 * @description
 * # findNavbar
 */
angular.module('tipntripApp')
  .directive('findNavbar', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the findNavbar directive');
      }
    };
  });
