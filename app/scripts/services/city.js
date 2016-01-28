'use strict';

/**
 * @ngdoc service
 * @name tipntrip2App.cityFactory
 * @description
 * # cityFactory
 * Factory in the tipntrip2App.
 */
angular.module('tipntripApp')
  .factory('cityFactory', function () {
    // Service logic
    // ...

    // Public API here
    return {
      getCities: function (country_name) {
        var cities = [{name:'Paris'},{name:'London'}];
        return cities;
      }
    };
  });
