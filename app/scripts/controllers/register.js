'use strict';

/**
 * @ngdoc function
 * @name tipntripApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the tipntripApp
 */
angular.module('tipntripApp')
  .controller('RegisterCtrl', ['$scope','$firebaseAuth','$state','$window',function($scope,$firebaseAuth,$state,$window) {
        $scope.user = {firstname :"",lastname:"",username:"",email:"",password:""};

        $scope.register = function(){
            var ref = new Firebase("https://tipandtrip.firebaseio.com/");
            ref.createUser({
              email: $scope.user.email,
              password: $scope.user.password
            }, function(error, userData) {
              if (error) {
                switch (error.code) {
                  case "EMAIL_TAKEN":
                    console.log("The new user account cannot be created because the email is already in use.");
                    break;
                  case "INVALID_EMAIL":
                    console.log("The specified email is not a valid email.");
                    break;
                  default:
                    console.log("Error creating user:", error);
                }
              } else {
                console.log("Successfully created user account with uid:", userData.uid);
                ref.child("users").child(userData.uid).set({
                        first_name: $scope.user.firstname,
                        last_name: $scope.user.lastname,
                        username: $scope.user.username,
                        email: $scope.user.email,
                        isAdvisor: false

                });
                ref.authWithPassword({
                    email: $scope.user.email,
                    password: $scope.user.password
                    }, function(error, authData) {
                      if (error) {
                         $window.alert(error);
                    } else {
                        $window.alert("Authenticated successfully with payload:", authData);
                        $state.go('app.step1');
                    }
                    });

              }
            });
        }

    }]);
