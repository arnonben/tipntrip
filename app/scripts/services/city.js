'use strict';

/**
 * @ngdoc service
 * @name tipntrip2App.city
 * @description
 * # city
 * Factory in the tipntrip2App.
 */
angular.module('tipntripApp')
  .factory('city', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
