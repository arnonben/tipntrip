'use strict';

/**
 * @ngdoc function
 * @name tipntripApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the tipntripApp
 */
angular.module('tipntripApp')
  .controller('ResultsCtrl',['$scope',                             
                             'searchAdvisor',
                             '$firebaseAuth',
                             '$firebaseArray',
                             '$firebaseObject', 
                             'Ref', 
                             '$q', 
                             function ($scope,searchAdvisor,$firebaseAuth,$firebaseArray,$firebaseObject,Ref,$q) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
        //Get all the countries the Traveler picked from the searchAdvisor factory
        $scope.destinationsList = searchAdvisor.getCountries();
        
        //This will holds all the optional Advisors
        $scope.advisors = [];   

        //Holds the Advisors user-id
        $scope.advisorsUid = [];
        for (var i = $scope.destinationsList.length - 1; i >= 0; i--) {
            var dest = $scope.destinationsList[i].name;
            console.log($scope.destinationsList[i].name);
        }

        //For each destionation the user picked we are looking for its correspond Advisors
        for (var i = $scope.destinationsList.length - 1; i >= 0; i--) {
            var dest = $scope.destinationsList[i].name;
            console.log("dest:",dest)
            //Retrieve all the advisor which have expertie on the destination
            Ref.child("advisors-destinations").orderByChild(dest).equalTo("true").on("value", function(snapshot) {     
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key();
                    var childData = childSnapshot.val();
                    var containUid = function(key){
                        for (var i = $scope.advisorsUid.length - 1; i >= 0; i--) {
                            if($scope.advisorsUid[i] === key){
                                return true;
                            }
                        }
                        return false;
                    };

                    if(!containUid(key)){
                       $scope.advisorsUid.push(key); 
                    }
                });
                //Retrieve the user data for each Advisor 
                for (var i = $scope.advisorsUid.length - 1; i >= 0; i--) {
                    $scope.advisor = {};
                    Ref.child("users").child($scope.advisorsUid[i]).on("value", function(snapshot) {
                        var tmp = snapshot.val();
                        $scope.key = snapshot.key();
                        $scope.advisor.reviews = 0;
                        $scope.advisor.rate = 4;
                        $scope.advisor.first_name = tmp.first_name;
                        $scope.advisor.last_name = tmp.last_name;
                        Ref.child("advisors").child($scope.key).on("value", function(snapshot) {
                            var tmp = snapshot.val();
                            $scope.advisor.price = tmp.price;
                            $scope.advisor.description = tmp.description;
                            $scope.advisor.title = tmp.title;
                            $scope.advisor.destinations = tmp.destinations;
                            $scope.advisor.interests = tmp.interests;
                            $scope.advisors.push($scope.advisor)
                            for (var i = $scope.advisorsUid.length - 1; i >= 0; i--) {
                                console.log("Before retrieve advisors-countries")
                                Ref.child("advisors-destinations").child($scope.advisorsUid[i]).on("value", function(snapshot) {
                                    $scope.advisor.countries = [];
                                    snapshot.forEach(function(childSnapshot) {
                                        $scope.advisor.countries.push(childSnapshot.key());
                                    });
                                    Ref.child("advisors-interests").child($scope.advisorsUid[i]).on("value", function(snapshot){
                                        $scope.advisor.interests = [];
                                        snapshot.forEach(function(childSnapshot) {
                                            $scope.advisor.interests.push(childSnapshot.key());
                                        });
                                        $scope.$apply();
                                    });
                                });
                            }
                        });
                    }); 
                }
            });
        }                   
  }]);
