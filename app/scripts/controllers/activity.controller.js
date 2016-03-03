angular.module('tipntripApp')
.controller('ActivityCtrl', 
	[
		'$scope',
		'$rootScope',
		'$routeParams',
		'dbFirebase', 
		'$firebaseArray',
		'$firebaseObject',
		'userService', 
		'countryFactory',
		function($scope, $rootScope, $routeParams, dbFirebase, $firebaseArray, $firebaseObject, userService, countryFactory) {

			var ref = new Firebase("https://tipandtrip.firebaseio.com/");
			var authData = ref.getAuth();
            console.log(authData);

            $scope.advisorName = '';
            $scope.activityType = null;
			
			$scope.countries = countryFactory.getCountries();
            $scope.getCountryCode = function(countryName){
            	for (var i = 0; i < $scope.countries.length; i++){
            		if($scope.countries[i].name === countryName)		
            			return ($scope.countries[i].code).toLowerCase();
            	}
            }

			if($routeParams.activityId == undefined)
			{
	        	var travellerActivityRef = ref.child("traveller-activities").child(authData.uid);
		        $scope.travellerActivities = $firebaseObject(travellerActivityRef);

		        var advisorActivityRef = ref.child("advisor-activities").child(authData.uid);
		        $scope.advisorActivities = $firebaseObject(advisorActivityRef);
	        }
	        else
	        {

	        	if($routeParams.activityType == 'advisor')
	        	{
	        		$scope.activityType = 'Traveller';
        			var activityRef = ref.child("advisor-activities").child(authData.uid).child($routeParams.activityId);
        		}
        		else
        		{
        			$scope.activityType = 'Advisor';
        			var activityRef = ref.child("traveller-activities").child(authData.uid).child($routeParams.activityId);
        		}

        		obj = $firebaseObject(activityRef); 
        		obj.$loaded()
				  .then(function(data) {
				    console.log(data); // true
				    $scope.activity = data;
				    $scope.activity.advisorName = '';

				    if($routeParams.activityType == 'advisor')
				    	var userRef = $firebaseObject(ref.child("users").child($scope.activity.advisorId));
				    else
				    	var userRef = $firebaseObject(ref.child("users").child($scope.activity.travellerId));

					userRef.$loaded()
					  .then(function(data) {
					    console.log(data); // true
					    $scope.advisorName = data.first_name + ' ' + data.last_name;
					});
				})
	        }
    	}
    ]
);