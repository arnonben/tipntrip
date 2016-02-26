    /*global Firebase */
    'use strict';
    angular.module('tipntripApp')
    /*.controller('SearchController', [
        '$scope',
        '$rootScope',
        '$location', 
        '$routeParams', 
        'countryFactory', 
        'interestsFactory',
        'CountriesAndCities',
        'dbFirebase', 
        function($scope, $rootScope, $state, $stateParams, countryFactory, interestsFactory,CountriesAndCities,dbFirebase) {
        
        $scope.name = 'World';
        $scope.countries = countryFactory.getCountries();

        $scope.roles = interestsFactory.getInterestes();
        $scope.countryList = []; 

        $scope.removeCountry = function(index){
            console.log(index);
        };

        $scope.saveUserActivity = function(userActivity){
           
            userActivity.status = 'new';
            userActivity.traveler_UID = 79;
            userActivity.advisor_UID = 80;
            userActivity.title = 'Untitled Trip';
            userActivity.destination = $scope.countryList;

            var indexes= [];
            
            console.log(userActivity.interest);
            for (var i = 0; i < $scope.roles.length; i++) {
                if(userActivity.interest[i] != undefined && userActivity.interest[i] === true)
                   indexes.push(i);
            };
            
            userActivity.interest = [];
            for (var i = 0; i < indexes.length; i++) {
                userActivity.interest.push($scope.roles[indexes[i]].name);
            };
            
            dbFirebase.saveActivity(userActivity);
            alert('Activity Added Successfully');
            $location.path( "/advisors" );
        }


        $scope.user = {
            roles: []
        };
        $scope.checkAll = function() {
            $scope.user.roles = angular.copy($scope.roles);
        };
        $scope.uncheckAll = function() {
            $scope.user.roles = [];
        };
        $scope.checkFirst = function() {
            console.log($scope.user.roles); 
            $scope.user.roles.splice(0, $scope.user.roles.length);
            console.log($scope.user.roles); 
        };                        

        $scope.budget = 1;

        $scope.setBudget = function(newBudget){
            $scope.budget = newBudget;
        };

        $scope.date_depart = "";
        $scope.date_return = "";

        $scope.fillDates = function(date_depart , date_return){
            $scope.date_depart = date_depart;
            $scope.date_return = date_return;
        };
    }])*/

    .controller('ListController', ['$scope','$rootScope','dbFirebase', '$firebaseObject', function($scope, $rootScope , dbFirebase, $firebaseObject) {

        var myDataRef = new Firebase('https://tipandtrip.firebaseio.com');  
        var activityRef = myDataRef.child("activity");

        $scope.activityList = $firebaseObject(activityRef);
        
        console.log($scope.activityList);
    }])

    .controller('DetailController', ['$scope','$routeParams', 'dbFirebase', '$firebaseObject', function($scope, $routeParams, dbFirebase, $firebaseObject) {

        //console.log($stateParams.activityId);
        var myDataRef = new Firebase('https://tipandtrip.firebaseio.com');  
        var activityRef = myDataRef.child("activity").child($routeParams.activityId);

        $scope.activity = $firebaseObject(activityRef);
        
        console.log($scope.activity);
    }])


    .controller('ResultController', ['$scope', function($scope) {
        $scope.advisors =[
        {
            image: "images/arnon.jpg",
            name:"Arnon Benshahar",
            price:"20",
            description:"Click to edit summaryDiligent class master student in the computer science department. Finished my B.S. Computer Science in Bioinformatic's track in honor. Designed and implemented Applied Materials solutions as an application engineer for one year. Led part of the education effort in the Ilan Ramon Center-Yatziv project, a science education project for youth. Currently I am a part of EMC-BGU WWH project."
        },
        {
            image: "images/yaron.jpg",
            name:"Yaron Been",
            price:"20",
            description:"Led dozens of Search and Rescue missions, commanding a 5-member combat unit  Managed the work schedules of the soldiers in 669 unit"
        }
        ];

    }])

    .controller('AboutusController', ['$scope', function($scope) {
        $scope.a = 1;

    }])

    .controller('ProfileController', ['$scope', function($scope) {
        $scope.a = 1;
    }])

    .controller('SigninController' ,['$scope','$firebaseAuth','$state','$window',function($scope,$firebaseAuth,$state,$window){
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
    }])

    .controller('RegisterController', ['$scope','$firebaseAuth','$state','$window',function($scope,$firebaseAuth,$state,$window) {
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

