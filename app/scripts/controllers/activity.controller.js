angular.module('tipntripApp')
.controller('ActivityCtrl', 
	[
		'$scope',
		'$rootScope',
		'$routeParams',
		'dbFirebase', 
		'$firebaseObject', 
		function($scope, $rootScope , $routeParams, dbFirebase, $firebaseObject) {

			var ref = new Firebase("https://tipandtrip.firebaseio.com/");
			var authData = ref.getAuth();
            console.log(authData);

			$scope.getName = function(uid){
				console.log(uid);
				var userRef = ref.child('users').child(uid);
				var userObj = $firebaseObject(userRef);
				console.log(userObj);
				return userObj.first_name;
			}

			if($routeParams.activityId == undefined)
			{
	        	var activityRef = ref.child("traveller-activities").child(authData.uid);

		        $scope.activityList = $firebaseObject(activityRef);
	        	console.log($scope.activityList);
	        }
	        else
	        {
        		var activityRef = ref.child("traveller-activities").child(authData.uid).child($routeParams.activityId);
        		$scope.activity = $firebaseObject(activityRef); 
        		console.log($scope.activity);
	        }
    	}
    ]
);