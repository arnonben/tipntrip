angular.module('tipntripApp')
.controller('ActivityCtrl', 
	[
		'$scope',
		'$rootScope',
		'$routeParams',
		'dbFirebase', 
		'$firebaseObject', 
		function($scope, $rootScope , $routeParams, dbFirebase, $firebaseObject) {
			if($routeParams.activityId == undefined){
	        	var myDataRef = new Firebase('https://tipandtrip.firebaseio.com');  
	        	var activityRef = myDataRef.child("activity");
		        $scope.activityList = $firebaseObject(activityRef);
	        	console.log($scope.activityList);
	        }
	        else{
	        	var myDataRef = new Firebase('https://tipandtrip.firebaseio.com');  
        		var activityRef = myDataRef.child("activity").child($routeParams.activityId);
        		$scope.activity = $firebaseObject(activityRef); 
        		console.log($scope.activity);
	        }
    	}
    ]
);