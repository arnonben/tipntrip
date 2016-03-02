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
		function($scope, $rootScope, $routeParams, dbFirebase, $firebaseArray, $firebaseObject, userService) {

			var ref = new Firebase("https://tipandtrip.firebaseio.com/");
			var authData = ref.getAuth();
            console.log(authData);

            $scope.advisorName = '';
			$scope.getName = function(uid){
				if(uid != undefined)
				{

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
        			var activityRef = ref.child("advisor-activities").child(authData.uid).child($routeParams.activityId);
        		else
        			var activityRef = ref.child("traveller-activities").child(authData.uid).child($routeParams.activityId);
        		
        		obj = $firebaseObject(activityRef); 
        		obj.$loaded()
				  .then(function(data) {
				    console.log(data); // true
				    $scope.activity = data;
				    $scope.activity.advisorName = '';

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