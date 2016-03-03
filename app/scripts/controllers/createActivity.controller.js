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
            '$firebaseObject',
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
                $firebaseObject,
                $location,
                $routeParams) {

                var myDataRef = new Firebase('https://tipandtrip.firebaseio.com');  
                
                var advisorRef = myDataRef.child("advisors-services").child($routeParams.advisorId);

                var authData = myDataRef.getAuth();

                var advisorActivityRef = myDataRef.child("advisor-activities");
                var travellerActivityRef = myDataRef.child("traveller-activities");

                var advisorObjList = $firebaseArray(advisorActivityRef.child($routeParams.advisorId));
                var travelObjList = $firebaseArray(travellerActivityRef.child(authData.uid));
                
                var interests = [];
                var destination = [];
                var advisorObj = {};
                var travelObj = {};

                $scope.userActivity = {};
                $scope.userActivity.service_uid = null;
                $scope.userActivity.interest = [];
                $scope.noDestination = false;
                
                $scope.user = {roles: []};
                $scope.roles = interestsFactory.getInterestes();
                $scope.destinationsList = [];
                $scope.countries = countryFactory.getCountries();

                $scope.advisorSecvices = $firebaseArray(advisorRef); 
                
                $scope.saveUserActivity = function(userActivity){
                    
                    if(userActivity.title == undefined || userActivity.title == '')
                    {
                        alert('Please enter title');
                        return;
                    }

                    if(userActivity.service_uid == null)
                    {
                        alert('Please enter service type');
                        return;
                    }

                    if(userActivity.interest.length == 0)
                    {
                        alert('Please provide your interests');
                        return;
                    }

                    if($scope.destinationsList.length == 0)
                    {
                        alert('Please provide your destinations');
                        return;
                    }

                    travelObj.status = 'new';

                    travelObj.title = userActivity.title;
                    
                    if(userActivity.comment != undefined)
                        travelObj.comment = userActivity.comment;
                    
                    travelObj.service_uid = userActivity.service_uid;
                    
                    angular.forEach(userActivity.interest, function(value, key) {
                        if(value == true)
                            interests.push($scope.roles[key].name);
                    });

                    angular.forEach($scope.destinationsList, function(value, key) {
                        destination.push(value.name);
                    });
                    
                    travelObj.destinationList = destination;
                    travelObj.interest  = interests;

                    advisorObj = travelObj;

                    console.log(advisorObj);
                    advisorObj.travellerId = authData.uid;
                    
                    advisorObjList.$add(advisorObj).then(function(ref) {
                        console.log(ref.key()); 
                    }, function(error) {
                        console.log("Error:", error);
                    });

                    travelObj.advisorId = $routeParams.advisorId;

                    travelObjList.$add(travelObj).then(function(ref) {
                        $location.path("/activity/"+ref.key()+"/travel"); 
                    }, function(error) {
                        console.log("Error:", error);
                    });
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
