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
        var testRef = $firebaseObject(Ref.child('advisors/cc31c353-ca6a-440d-b188-af2016f72aef')); 
        $scope.advisors = [];
        $scope.destinationsList = searchAdvisor.getCountries();
        console.log("destinationsList:" , $scope.destinationsList);
        var ref = new Firebase("https://tipandtrip.firebaseio.com/");
        
        $scope.test = ref.child("advisors").orderByChild("price").equalTo("90");
        $scope.testArray = $firebaseArray($scope.test);
        $scope.testArray.$loaded()
            .then(function(data){
                console.log("data",data[0]);
            });
        $scope.advisorsUid = [];
        for (var i = $scope.destinationsList.length - 1; i >= 0; i--) {
            var dest = $scope.destinationsList[i].name;
            //var advisors-destinations = ref.child("advisors_destinations").orderByChild(dest).equalTo("true")
        }

        $scope.advisorsUid = [];
        for (var i = $scope.destinationsList.length - 1; i >= 0; i--) {
            var dest = "destinations/" + $scope.destinationsList[i].name;
            console.log("dest:",dest)
            ref.child("advisors").orderByChild(dest).equalTo("true").on("value", function(snapshot) {     
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
                for (var i = $scope.advisorsUid.length - 1; i >= 0; i--) {
                    $scope.advisor = {};
                    ref.child("users").child($scope.advisorsUid[i]).on("value", function(snapshot) {
                            var tmp = snapshot.val();
                            $scope.key = snapshot.key();
                            $scope.advisor.reviews = 0;
                            $scope.advisor.rate = 4;
                            $scope.advisor.first_name = tmp.first_name;
                            $scope.advisor.last_name = tmp.last_name;
                            ref.child("advisors").child($scope.key).on("value", function(snapshot) {
                                var tmp = snapshot.val();
                                $scope.advisor.price = tmp.price;
                                $scope.advisor.description = tmp.description;
                                $scope.advisor.title = tmp.title;
                                $scope.advisor.destinations = tmp.destinations;
                                $scope.advisor.interests = tmp.interests;

                            });                       
                    });
                    $scope.advisor.$loaded().then(function(data) {
                        console.log(data);
                    });

                };

            });
        }

        $scope.getResults = function(){
            var ref = new Firebase("https://tipandtrip.firebaseio.com/");
            $scope.advisorsUid = [];
            for (var i = $scope.destinationsList.length - 1; i >= 0; i--) {
                var dest = $scope.destinationsList[i].name;
                ref.child("advisors-countries").orderByChild(dest).equalTo("true").on("value", function(snapshot) {     
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

                    for (var i = $scope.advisorsUid.length - 1; i >= 0; i--) {
                        $scope.advisor = {};
                        ref.child("users").child($scope.advisorsUid[i]).on("value", function(snapshot) {
                                var tmp = snapshot.val();
                                $scope.key = snapshot.key();
                                $scope.advisor.reviews = 0;
                                $scope.advisor.rate = 4;
                                $scope.advisor.first_name = tmp.first_name;
                                $scope.advisor.last_name = tmp.last_name;
                                ref.child("advisors").child($scope.key).on("value", function(snapshot) {
                                    var tmp = snapshot.val();
                                    $scope.advisor.price = tmp.price;
                                    $scope.advisor.description = tmp.description;
                                    $scope.advisor.title = tmp.title;
                                    ref.child("advisors-countries").child($scope.key).on("value", function(snapshot) {
                                        $scope.advisor.countries = [];
                                        snapshot.forEach(function(childSnapshot) {
                                            $scope.advisor.countries.push(childSnapshot.key());
                                        });
                                        ref.child("advisors-interests").child($scope.key).on("value", function(snapshot){
                                            $scope.advisor.interests = [];
                                            snapshot.forEach(function(childSnapshot) {
                                                $scope.advisor.interests.push(childSnapshot.key());
                                            });
                                        });
                                    });
                                });                       
                        });
                    };

                });
            };
        };

    
  }]);
