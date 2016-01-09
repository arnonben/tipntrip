'use strict';

/**
 * @ngdoc function
 * @name tipntripApp.controller:RegisteradvisorCtrl
 * @description
 * # RegisteradvisorCtrl
 * Controller of the tipntripApp
 */
angular.module('tipntripApp')
  .controller('RegisterAdvisorCtrl',['$scope','$firebaseAuth','countryFactory', function($scope,$firebaseAuth,countryFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.ref = new Firebase("https://tipandtrip.firebaseio.com/");
	$scope.authData = ref.getAuth();

	console.log(authData.auth.uid);

    $scope.countries = countryFactory.getCountries();
	$scope.description = "";
	$scope.price = 0;
	$scope.destinations = [];
	$scope.interests = [];

	$scope.addDestination = function() {
        $scope.destinations.push($scope.destination); 
        console.log($scope.destinations);                 
	};

	//$scope.roles = interestsFactory.getInterestes();

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

	$scope.createAdvisor = function(){
		//First we create a new Advisor in the Advisor list
		var advisorRef = $scope.ref.child("advisors");
		var description = $scop.description
		var uid = authData.auth.uid;
		var price = $scope.price;
		advisorRef.set({
		  uid : {
		    "description" : description,
		    "price" : price
		    //TODO add here upload photo
		  }
		});	

		var destinations = $scope.destinations;
		var advisorCountriesRef = $scope.ref.child("advisors-countries");
		advisorRef.set({
		  uid : destinations
		});	

		var advisorCountriesRef = $scope.ref.child("advisors-interests");
		advisorRef.set({
		  uid : interests
		});	

	}



  }]);
