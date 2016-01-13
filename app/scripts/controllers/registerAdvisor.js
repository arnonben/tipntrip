'use strict';
/**
 * @ngdoc function
 * @name tipntripApp.controller:RegisteradvisorCtrl
 * @description
 * # RegisteradvisorCtrl
 * Controller of the tipntripApp
 */
angular.module('tipntripApp')
  .controller('RegisterAdvisorCtrl',['$scope','$firebaseAuth','countryFactory','interestsFactory',"$state" , function($scope,$firebaseAuth,countryFactory,interestsFactory,$state) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // Will be deleted when integrate with Hardik
    $scope.ref = new Firebase("https://tipandtrip.firebaseio.com/");
	$scope.authData = $scope.ref.getAuth();
	console.log("Authdata:" + $scope.authData.uid);

	//Initiate Advisor's fields
	$scope.init = function(){
		$scope.uid = $scope.authData.uid;
		$scope.title = "";
		$scope.description = "";
		$scope.price = 0;
		$scope.destinations = [];
		$scope.interests = [];
	};
	$scope.init();

    $scope.countries = countryFactory.getCountries();

    //Advisor list all the countries he knows about
	$scope.addDestination = function(select_country){
        if (select_country === undefined || select_country === null){
        	$scope.countryErr = "Error: Please choose a country!!"
    		console.log($scope.countryErr);
    		return;
        }
        if($scope.containCountry(select_country.name) === -1){
        	$scope.destinations.push($scope.select_country); 
	        /*
	        TODO
	        $scope.currentCountry.altitude = countryFactory.getAltitude(select_country.name);
	        $scope.currentCountry.latitude = countryFactory.getLatitude(select_country.name);
	        */             
	        console.log($scope.destinations);
	    }
	    else {
	    	$scope.countryErr = "Error: You can't choose the same country twice!!"
    		console.log($scope.countryErr);
	    }
    };
    //Checks weather the country already exist in the destinations list.
    $scope.containCountry = function(country_name){
    	for (var i = $scope.destinations.length - 1; i >= 0; i--) {
    		var country = $scope.destinations[i];
    		if(country.name === country_name){
    			return i;
    		}
    	};
    	return -1;
    }

    //Advior interests. Using checklist-model.
	$scope.roles = interestsFactory.getInterestes();
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
		var uid = $scope.uid;
		var advisorRef = $scope.ref.child("advisors").child(uid);
		var description = $scope.description
		var price = $scope.price;
		var title = $scope.title;
		var interests = [];
		for (var i = $scope.user.roles.length - 1; i >= 0; i--) {
			interests[i] = $scope.user.roles[i].name;
		};
		var destinations = $scope.destinations;
		console.log("interests: " + interests );
		console.log("destinations: " +destinations);
		console.log("uid: " + uid + " price: " + price + " title: " + title + " description: " + description);
		advisorRef.set({
		    description : description,
		    price : price,
		    title : title		    
		});	
		var advisorCountriesRef = $scope.ref.child("advisors-countries").child(uid);
		for (var i = $scope.destinations.length - 1; i >= 0; i--) {
			console.log("Country " + $scope.destinations[i].name)
			advisorCountriesRef.child($scope.destinations[i].name).set("true");
		};
		
		var advisorInterestsRef = $scope.ref.child("advisors-interests").child(uid);
		for (var i = interests.length - 1; i >= 0; i--) {
			console.log("Interests " + interests[i])
			advisorInterestsRef.child(interests[i]).set("true");
		};

		$state.go('app.step1');
		

	}



  }]);
