angular.module('tipntrip2App')
.factory('dbFirebase', function(){
	var myDataRef = new Firebase('https://tipandtrip.firebaseio.com');	
	console.log(myDataRef);
	var activityRef = myDataRef.child("activity");
	console.log(activityRef);
	
	var response = {
		'data': null,
		'done': false,
		'message':'failled'
	};
	return{
		saveActivity : function(activity){
			newActivity = activityRef.push();
			newActivity.set(activity);
			// response = {
			// 	'data' : 162127,
			// 	'done' : true,
			// 	'message' : 'success',
			// }
			
			return response;
		},
		removeActivity : function(){

		},
		getAllActivities : function(){

		}
	};
});