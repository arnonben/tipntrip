'use strict';

angular.module('tipntripApp')
.factory('interestsFactory', [function() {
	
	var interestsfac = {};
	
	interestsfac.getInterestes = function(){ 
		var interests = [ 
		{name: 'Hiking'},
		{name: 'Rest & Relax'},
		{name: 'Must see'},
		{name: 'Shooping'},
		{name: 'Nature'},
		{name: 'Sport'},
		{name: 'History'},
		{name: 'Art'},
		{name: 'Food'},
		{name: 'Extreme'},
		{name: 'Family'},
		{name: 'Museums'}
		];
		return interests;
	};
	
	return interestsfac;                    

}]);