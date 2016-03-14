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
		'$q',
		function($scope, $rootScope, $routeParams, dbFirebase, $firebaseArray, $firebaseObject, userService, countryFactory, $q) {

			var ref = new Firebase("https://tipandtrip.firebaseio.com/");
			var authData = ref.getAuth();
            console.log(authData);

            $scope.advisorName = '';
            $scope.activityType = null;
            $scope.advisorActivities = [];
            $scope.travellerNames = [];

            $scope.getAdviosorData = function() {
            	
            	var deferred = $q.defer();
    			var subPromise = [];

    			var advisorActivityRef = ref.child("advisor-activities").child(authData.uid);
		        var advisorObj = $firebaseObject(advisorActivityRef);

    			var advisorActivities = [];
    			var activityData = [];

		        var func = advisorObj.$loaded().then(function(data) {
		        	console.log(data);
		        	activityData = data;
				});

				subPromise.push(func);

				$q.all(subPromise).then(function() {

					var sub = []

					angular.forEach(activityData, function(value, key) {
                        
	                    var userRef = $firebaseObject(ref.child("users").child(value.travellerId));

						var func = userRef.$loaded()
						  .then(function(data) {
						    value.travellerName = data.first_name + ' ' + data.last_name;
						    value.key = key;
						    advisorActivities.push(value);
						    console.log(value);
						});
						  
						sub.push(func);
	                });

					$q.all(sub).then(function() {
			    		console.log(advisorActivities);
			    		deferred.resolve(advisorActivities);
			    	});
			    });

			    return deferred.promise;
            }

            $scope.getTravellerData = function(){

            	var deferred = $q.defer();
    			var subPromise = [];

    			var advisorActivityRef = ref.child("traveller-activities").child(authData.uid);
		        var advisorObj = $firebaseObject(advisorActivityRef);

    			var advisorActivities = [];
    			var activityData = [];

		        var func = advisorObj.$loaded().then(function(data) {
		        	activityData = data;
				});

				subPromise.push(func);

				$q.all(subPromise).then(function() {

					var sub = []

					angular.forEach(activityData, function(value, key) {
                        
	                    var userRef = $firebaseObject(ref.child("users").child(value.advisorId));

						var func = userRef.$loaded()
						  .then(function(data) {
						    value.advisorName = data.first_name + ' ' + data.last_name;
						   	value.key = key;
						    advisorActivities.push(value);
						    console.log(value);
						});
						  
						sub.push(func);
	                });

					$q.all(sub).then(function() {
			    		console.log(advisorActivities);
			    		deferred.resolve(advisorActivities);
			    	});
			    });

			    return deferred.promise;

            }

            $scope.updateStatus = function(status, id) {
            	console.log(status);
            	console.log(id);

            	var activityRef = ref.child("advisor-activities").child(authData.uid).child(id);
            	
            	obj = $firebaseObject(activityRef); 
        		obj.$loaded().then(function(data) {
        			obj.status = status;
        			console.log(obj);
        			obj.$save().then(function(resp) {
				
					 	var activityRef = ref.child("traveller-activities").child(obj.travellerId).child(id);
            	
		            	objTravel = $firebaseObject(activityRef); 
		        		objTravel.$loaded().then(function(data) {
		        			objTravel.status = status;
		        			console.log(objTravel);
		        			objTravel.$save().then(function(resp) {
							 	alert('Activity is ' + status + ' successfully');
							 	$scope.getTravellerData().then(function(data){
						        	$scope.travellerActivities = data;
						        });

						        $scope.getAdviosorData().then(function(data){
						        	$scope.advisorActivities = data;
						        });
							}, function(error) {
							 	console.log("Error:", error);
							});
						});

					}, function(error) {
					 	console.log("Error:", error);
					});
				});



            }
			
			$scope.countries = countryFactory.getCountries();
            $scope.getCountryCode = function(countryName){
            	for (var i = 0; i < $scope.countries.length; i++){
            		if($scope.countries[i].name === countryName)		
            			return ($scope.countries[i].code).toLowerCase();
            	}
            }

			if($routeParams.activityId == undefined)
			{
		        $scope.getTravellerData().then(function(data){
		        	$scope.travellerActivities = data;
		        });

		        $scope.getAdviosorData().then(function(data){
		        	$scope.advisorActivities = data;
		        });
	        }
	        else
	        {
	        	$scope.activityType = $routeParams.activityType;
	        	$scope.activityId = $routeParams.activityId;
	        	
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
				    	var userRef = $firebaseObject(ref.child("users").child($scope.activity.travellerId));
				    else
				    	var userRef = $firebaseObject(ref.child("users").child($scope.activity.advisorId));

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