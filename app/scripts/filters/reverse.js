'use strict';

angular.module('tipntripApp')
.filter('reverse', function() {
	return function(items) {
		return angular.isArray(items)? items.slice().reverse() : [];
	};
});
