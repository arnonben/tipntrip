angular.module('tipntripApp').
directive('countryList', function($parse, $compile){

return {
    //require: 'ngModel',
    restrict: "A",
    transclude: false,
    link : function(scope, element, attrs, model){
    	function addHtml(country,index){
    		console.log(index);
        	element.append('<li class="list-group-item"><span>'+country+'</span><a class="text-danger pull-right" ng-click="removeCountry('+index+')">X</a></li>');
        };
        
        scope.addCountry = function(select_country){
            console.log(select_country);
        	scope.check = select_country.name;
            var isExist = false;
            for (var i = 0; i < scope.countryList.length; i++) {
                if(scope.countryList[i] == select_country.name)
                    isExist =true;
            };
            if(isExist == false){
                scope.countryList.push(scope.check);
        		addHtml(scope.check,scope.countryList.length - 1);
        	}
        };
    }
}
})
/*.directive('removeCountry', function($parse, $compile){
   return{
       restrict:"A",
       transclude:true,
       link : function(scope, element, attrs, model){
            scope.removeCountry(index){
                element.parent.remove();
            };
       }
   } 
})*/;