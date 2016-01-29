'use strict';


angular.module('tipntripApp').directive('ngRepeatDirective', function() {
	return function(scope, element, attrs) {
		if (scope.$last){
			$(".chat-message").animate({ scrollTop: $('.chat-message').prop("scrollHeight")}, 100);
		}
	}
});
