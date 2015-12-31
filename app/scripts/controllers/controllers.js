    /*global Firebase */
    'use strict';
    angular.module('tipntrip2App')
    .controller('SearchController', ['$scope', 'countryFactory', 'interestsFactory', function($scope, countryFactory, interestsFactory) {
        $scope.name = 'World';

        $scope.countries = countryFactory.getCountries();

        $scope.roles = interestsFactory.getInterestes();
        
        $scope.countryList = []; 
        $scope.addCountry= function(select_country){
            $scope.check = select_country.name;
            $scope.countryList.push($scope.check);                    
        };

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
            $scope.user.roles.splice(0, $scope.user.roles.length); 
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

    .controller('SigninController' ,['$scope','$firebaseSimpleLogin',function($scope,$firebaseSimpleLogin){
        var firebaseObj = new Firebase("https://tipandtrip.firebaseio.com/");
        var loginObj = $firebaseSimpleLogin(firebaseObj);

        $scope.SignIn = function($scope) {
            var username = $scope.user.email;
            var password = $scope.user.password;

            console.log(username);
            console.log(password);
             
            loginObj.$login('password', {
                email: username,
                password: password
            })
            .then(function(user) {
                user = user;
                console.log('Authentication successful');
            }, function(error) {
                error = error;
                console.log('Authentication failure');
            });
        };
    }])

    .controller('RegisterController', ['$scope', function($scope) {
        $scope.data = 1;

    }]);

