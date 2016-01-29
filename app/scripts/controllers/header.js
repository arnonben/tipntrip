    'use strict';
    angular.module('tipntripApp')
        .controller('HeaderCtrl', ['$scope','$firebaseAuth', function($scope,$firebaseAuth) {
        	var ref = new Firebase("https://tipandtrip.firebaseio.com/");
			var authData = ref.getAuth();

			$scope.isCurrent = false;
			if(authData){
				$scope.isCurrent = true;
				$scope.email = authData.password.email;
			}

			$scope.logout = function(){
				ref.unauth();
				console.log("logout from");
				$scope.isCurrent = false;
			};
			

    }]); 
