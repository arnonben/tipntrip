'use strict';

 /* @name chatApp
=======
/**
 * @ngdoc overview
 * @name tipntrip2App
>>>>>>> 7ef80238459073e9277a565cb97f33b40467cfd5
 * @description
 * # chatApp
 *
 * Main module of the application.
 */
angular.module('tipntripApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.ref',
    'firebase.auth',
    'angucomplete-alt',
    'ui.bootstrap',
    'emojiApp',
    'checklist-model',
    'mgo-angular-wizard'
]);

angular.module('tipntripApp')

        .config(['$compileProvider', function ($compileProvider) {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
            }])

        .run(function ($rootScope) {
//            $rootScope.email = User;
        });



function ucfirst(str) {
    // inspired by: http://kevin.vanzonneveld.net
    str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
}

var getIndexIfObjWithOwnAttr = function (array, attr, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}



String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

