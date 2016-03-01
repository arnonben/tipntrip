angular.module('tipntripApp')
.factory('dbFirebase', function(){
	
	var myDataRef = new Firebase('https://tipandtrip.firebaseio.com');	
	var activityRef = myDataRef.child("activity");
	var advisorActivityRef = myDataRef.child("advisor-activities");
	var travellerActivityRef = myDataRef.child("traveller-activities");
	
	var activityList = [];

	activityRef.on("value", function(snapshot) {
	 	var activityList = snapshot.val();
	 	//console.log(activityList);
	});

	var response = {
		'data': null,
		'done': false,
		'message':'failled'
	};

	return{
		saveActivity : function(activity,advisorId,travellerId){
			var advisorActivity = activity;
			advisorActivity.travellerId = travellerId;
			
			var newAdvisorActivityNodeRef = advisorActivityRef.child(advisorId);
			newActivity =  newAdvisorActivityNodeRef.push();
			newActivity.set(advisorActivity);

			var travellerActivity = activity;
			delete travellerActivity.travellerId;
			travellerActivity.advisorId = advisorId;

			var newTravellerActivityNodeRef = travellerActivityRef.child(travellerId);
			newActivity =  newTravellerActivityNodeRef.push();
			newActivity.set(travellerActivity);	
			return true;
		},
		removeActivity : function(){

		},
		getAllActivities : function(){
			return activityList;
		}
	};
});