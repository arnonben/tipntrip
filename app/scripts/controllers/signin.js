'use strict';

/**
 * @ngdoc function
 * @name tipntripApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the tipntripApp
 */
angular.module('tipntripApp')
  .controller('SigninCtrl' ,['$scope','$firebaseAuth','$state','$window',function($scope,$firebaseAuth,$state,$window) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.user = {email:"",password:""};
    $scope.user.remember = false;
    $scope.SignIn = function(){ 
	    var mail = $scope.user.email;
        var pass = $scope.user.password;
        var rem = "default";
        if ($scope.user.remember){
            rem = "sessionOnly";
        }
        var ref = new Firebase("https://tipandtrip.firebaseio.com/");
        ref.authWithPassword({
            email    : mail,
            password : pass,
            remember: rem
        }, function(error, authData) {
            if (error) {
                $window.alert(error);
                } else {
                    $window.alert("Authenticated successfully with payload:", authData);
                    $state.go('app.step1');
                }
            });     
        };
    $scope.FacebookSignIn = function() {
        var ref = new Firebase("https://tipandtrip.firebaseio.com");
        ref.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                // the access token will allow us to make Open Graph API calls
                console.log(authData.facebook.accessToken);
            }
        }, {
        scope: "email,user_likes" // the permissions requested
        });
    };

    $scope.Reset = function(){
        var ref = new Firebase("https://tipandtrip.firebaseio.com/");
        ref.resetPassword({
            email : $scope.reset.email
        }, function(error) {
            if (error === null) {
	            console.log("Password reset email sent successfully");
            } else {
                console.log("Error sending password reset email:", error);
              }
            });
        }
  }]);