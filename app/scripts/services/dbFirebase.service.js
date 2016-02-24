angular.module('tipntrip2App')
.factory('dbFirebase', function(){
	var myDataRef = new Firebase('https://tipntripnew.firebaseIO.com');	
	var usersRef = myDataRef.child("userPlan");	
	return{
		savePlan : function(userPlan){
			usersRef.set(userPlan);
		}
	};
});