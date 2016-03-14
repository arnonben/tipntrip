angular.module('tipntripApp')
.directive('destinationsList', function($parse, $compile){

return {
    restrict: "A",
    link : function(scope, element, attrs, model){
        
        scope.addCountry = function(select_country){
            scope.check = select_country;
            index = 0;

            var isExist = false;
            for (var i = 0; i < scope.destinationsList.length; i++) {
                if(scope.destinationsList[i].code == select_country.code)
                    isExist =true;
            };

            if(isExist == false){
                scope.destinationsList.push(scope.check);
                // var strElm = '<li class="list-group-item" id="destination-'+select_country.code+'"><span class="flag-icon flag-icon-'+select_country.code.toLowerCase()+'"></span><span>&nbsp;&nbsp;'+select_country.name+'</span><button class="btn btn-xs btn-danger pull-right" ng-click=removeDestination("'+select_country.code+'")>X</button></li>';
                // var compiledHtml = $compile(strElm);
                // var html = compiledHtml(scope);
                //element.append(html);
            }
            console.log(isExist);
        };

        scope.removeDestination = function(code){
            console.log(code);
            for (var i = 0; i < scope.destinationsList.length; i++) {
                if(scope.destinationsList[i].code == code)
                {
                    scope.destinationsList.splice(i,1);
                    var element = document.getElementById("destination-"+code);
                    element.parentNode.removeChild(element);
                }
            };
        }
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