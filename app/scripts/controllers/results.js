'use strict';

/**
 * @ngdoc function
 * @name tipntripApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the tipntripApp
 */
angular.module('tipntripApp')
  .controller('ResultsCtrl',['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    /*
    Retrieve data from Firebase db based on the search fields: Foar the moment will be only
    countries
    */
    var ref = new Firebase("https://tipandtrip.firebaseio.com/advisors-countries");
    $scope.advisorsUid = [];
    console.log($scope.destinationsList.length);
    for (var i = $scope.destinationsList.length - 1; i >= 0; i--) {
        var dest = $scope.destinationsList[i];
        console.log("i");
        ref.orderByChild(dest).equalTo("true").on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // key will be "fred" the first time and "barney" the second time
                var key = childSnapshot.key();
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                console.log("key" , key, " value " , childData);
            });
        });
    };

    
  }]);
