'use strict';

/**
 * @ngdoc function
 * @name tipntrip2App.controller:SearchctrlCtrl
 * @description
 * # SearchctrlCtrl
 * Controller of the tipntrip2App
 */
angular.module('tipntripApp')
        .controller('CreateActivityCtrl', ['$scope',
            'countryFactory',
            'interestsFactory',
            'cityFactory',
            'searchAdvisor',
            'dbFirebase',
            'User',
            '$firebaseAuth',
            '$firebaseArray',
            '$location',
            '$routeParams',
            function ($scope,
                countryFactory,
                interestsFactory,
                cityFactory,
                searchAdvisor,
                dbFirebase,
                User,
                $firebaseAuth,
                $firebaseArray,
                $location,
                $routeParams) {

                $scope.user = {roles: []};
                $scope.roles = interestsFactory.getInterestes();
                $scope.destinationsList = [];
                $scope.countries = countryFactory.getCountries();
                var myDataRef = new Firebase('https://tipandtrip.firebaseio.com');  
                
                var advisorRef = myDataRef.child("advisors-services").child($routeParams.advisorId);
                $scope.advisorSecvices = $firebaseArray(advisorRef); 
                
                var advisorDestinationRef = myDataRef.child("advisors-destinations").child($routeParams.advisorId);
                $scope.advisorDestinations = $firebaseArray(advisorDestinationRef);
                
                var advisorInterestRef = myDataRef.child("advisors-interests").child($routeParams.advisorId);
                $scope.advisorInterests = $firebaseArray(advisorInterestRef);

                $scope.saveUserActivity = function(userActivity){
                    var ref = new Firebase("https://tipandtrip.firebaseio.com/");
                    var authData = ref.getAuth();
                    var travelerUid = authData.uid;
                    var advisorUid = $routeParams.advisorId;

                    //Status can be accepted, new, decline or cancelled.
                    userActivity.status = 'new';
                    if(userActivity.title == '' || userActivity.title == undefined)
                        userActivity.title = 'Untitled Trip';
                    
                    userActivity.destinationList = $scope.destinationsList;
                    console.log(userActivity);
                    //console.log(travelerActivity);
                    /*var indexes= [];
                    for (var i = 0; i < $scope.advisorInterests.length; i++) {
                        if(userActivity.interest[i] === true)
                           indexes.push(i);
                    };
                
                    userActivity.interest = [];
                    for (var i = 0; i < indexes.length; i++) {
                        userActivity.interest.push($scope.advisorInterests[indexes[i]].$id);
                    };*/
                    var response = dbFirebase.saveActivity(userActivity,advisorUid,travelerUid)
                    console.log(response);    
                    
                    //$location.path('/activityList');
                }

             
                //When a new country is been 
                $scope.resetCurrentCountry = function () {
                    $scope.currentCountry = {
                        name: "",
                        cities: [],
                        citiesSelected: []
                    };
                    $scope.showCities = false;
                }

                $scope.resetCurrentCountry();

                $scope.containCountry = function (country_name) {
                    console.log("$scope.destinationsList.length : " + $scope.destinationsList.length);
                    for (var i = $scope.destinationsList.length - 1; i >= 0; i--) {
                        var country = $scope.destinationsList[i];
                        console.log("Inside contain loop: " + country)
                        if (country.name === country_name) {
                            return i;
                        }
                    }
                    ;
                    return -1;
                }

                /*
                 When selecting a new city we add it to the cities array
                 */
                $scope.addCity = function (selected_city) {
                    if ($scope.containCity(selected_city.name) === -1) {
                        var city = {name: selected_city.name};
                        /*
                         city.altitude = cityFactory.getAltitude(select_country.name);
                         city.latitude = cityFactory.getLatitude(select_country.name);
                         */
                        $scope.currentCountry.citiesSelected.push(city);
                    }
                };

                $scope.containCity = function (city_name) {
                    for (var i = $scope.currentCountry.citiesSelected.length - 1; i >= 0; i--) {
                        var city = $scope.currentCountry.citiesSelected[i];
                        if (city.name === city_name) {
                            return i;
                        }
                    }
                    ;
                    return -1;
                }

                /*
                 After you add all the cities of a specific country you add the country to the destinations list.
                 */
                $scope.addDestination = function (select_country) {
                    $scope.destinationsList.push($scope.currentCountry);
                    $scope.resetCurrentCountry();
                    console.log($scope.destinationsList);
                };

                $scope.containCities = function (destination) {
                    if (destination.citiesSelected.length > 0) {
                        return true;
                    }
                    return false;
                }

               
                $scope.checkAll = function () {
                    $scope.user.roles = angular.copy($scope.roles);
                };
                $scope.uncheckAll = function () {
                    $scope.user.roles = [];
                };
                $scope.checkFirst = function () {
                    $scope.user.roles.splice(0, $scope.user.roles.length);
                };
               
                $scope.budget = 1;

                $scope.setBudget = function (newBudget) {
                    $scope.budget = newBudget;
                };

              
                $scope.date_depart = new Date();
                $scope.date_return = new Date();
                $scope.date_return.setDate($scope.date_return.getDate() + 1);

        }
    ]
);
