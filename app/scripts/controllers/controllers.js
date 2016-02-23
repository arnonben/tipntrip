    /*global Firebase */
    'use strict';
    angular.module('tipntrip2App')
    .controller('SearchController', ['$scope', 'countryFactory', 'interestsFactory','CountriesAndCities', function($scope, countryFactory, interestsFactory,CountriesAndCities) {
        // CountriesAndCities.getCountriesAndCities(function(response){
        //     console.log(response);
        // });
        $scope.name = 'World';
        $scope.countries = countryFactory.getCountries();

        $scope.roles = interestsFactory.getInterestes();
        $scope.countryList = []; 
        $scope.addCountry= function(select_country){
            $scope.check = select_country.name;
            var isExist = false;
            for (var i = 0; i < $scope.countryList.length; i++) {
                if($scope.countryList[i] == select_country.name)
                    isExist =true;
            };
            if(isExist == false)
                $scope.countryList.push($scope.check);                 
            
            //console.log($scope.countryList);
            //console.log(isExist);
        };
        $scope.removeCountry = function(index){
            //$scope.countryList.splice();
            delete $scope.countryList[index];
            $scope.list[index] = true;
            console.log($scope.countryList);
        };

        $scope.saveUserInterest = function(){

        }


        $scope.savePlan = function(user){
            user.countryList = $scope.countryList;
            console.log(user);
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

    .controller('ResultsController', ['$scope', function($scope) {
        $scope.a = 1;
    }])

    .controller('ProfileController', ['$scope', function($scope) {
        $scope.a = 1;
    }])

        .controller('SigninController' ,['$scope','$firebaseAuth',function($scope,$firebaseAuth){
            $scope.email = "";
            $scope.password = "";
            $scope.SignIn = function(){ 
                var ref = new Firebase("https://tipandtrip.firebaseio.com/");
                ref.authWithPassword({
                  email    : $scope.email,
                  password : $scope.password
                }, function(error, authData) {
                  if (error) {
                    console.log("Login Failed!", error);
                  } else {
                    console.log("Authenticated successfully with payload:", authData);
                  }
                });
                $scope.email = "";
                $scope.password = "";
          };
        }])

    .controller('RegisterController', ['$scope', function($scope) {
        $scope.data = 1;

    }]);

