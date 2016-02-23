angular.module('tipntrip2App')
.factory('dbFirebase', function(){
	
	var myDataRef = new Firebase('https://tipandtrip.firebaseio.com');	
	var activityRef = myDataRef.child("activity");
	
	var activityList = [];

	activityRef.on("value", function(snapshot) {
	 	var activityList = snapshot.val();
	 	console.log(activityList);
	});

	var response = {
		'data': null,
		'done': false,
		'message':'failled'
	};

	return{
		saveActivity : function(activity){
			newActivity = activityRef.push();
			newActivity.set(activity);
			return true;
		},
		removeActivity : function(){

		},
		getAllActivities : function(){
			return activityList;
		}
	};
});