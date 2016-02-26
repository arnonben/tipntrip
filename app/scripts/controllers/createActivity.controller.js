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
            '$firebaseAuth',
            '$firebaseArray',
            '$location',
            function ($scope,
                countryFactory,
                interestsFactory,
                cityFactory,
                searchAdvisor,
                dbFirebase,
                $firebaseAuth,
                $firebaseArray,
                $location) {
                $scope.awesomeThings = [
                    'HTML5 Boilerplate',
                    'AngularJS',
                    'Karma'
                ];

                /*Start CL's Code*/
                $scope.countryList = []; 
                //save user activity rxzx
                $scope.saveUserActivity = function(userActivity){
                    //Status can be accepted, new, decline or cancelled.
                    userActivity.status = 'new';
                    userActivity.travelerUid = 79;
                    userActivity.adviserUid = 80;
                    if(userActivity.typeOfAdvise == 1)
                        userActivity.chargeAmount = 1000;
                    else if(userActivity.typeOfAdvise == 2)
                        userActivity.chargeAmount = 2000;
                    else if(userActivity.typeOfAdvise == 3)
                        userActivity.chargeAmount = 3000;
                    userActivity.title = 'Untitled Trip';
                    userActivity.destinationList = $scope.countryList;
                    var indexes= [];
                    for (var i = 0; i < $scope.roles.length; i++) {
                        if(userActivity.interest[i] === true)
                           indexes.push(i);
                    };
                    //console.log(indexes);
                    userActivity.interest = [];
                    for (var i = 0; i < indexes.length; i++) {
                        userActivity.interest.push($scope.roles[indexes[i]].name);
                    };
                    var response = dbFirebase.saveActivity(userActivity)
                    console.log(response);    
                    //$rootScope.userPlanList.push(userActivity);
                    $location.path('/activityList');
                }

                $scope.user = {
                    roles: []
                };

                /*End CL's code*/
                /*
                 Find_step1: choose you destinations: Each destinations composed of country and list of selected cities in that country 
                 */
                $scope.destinationsList = [];
                $scope.countries = countryFactory.getCountries();

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

                /**
                 *When choosing a new country first set it as the current country.
                 *Get all the cities of this country from the cityFactory.
                 *Init the selected cities and show the select cities input form,
                 */
                
                /*$scope.addCountry = function (select_country) {
                    console.log(select_country);
                    if ($scope.containCountry(select_country.name) === -1) {
                        $scope.currentCountry.name = select_country.name;
                        
                         TODO
                         $scope.currentCountry.altitude = countryFactory.getAltitude(select_country.name);
                         $scope.currentCountry.latitude = countryFactory.getLatitude(select_country.name);
                         
                        $scope.currentCountry.cities = cityFactory.getCities(select_country.name);
                        $scope.currentCountry.citiesSelected = [];
                        $scope.showCities = true;
                    }
                };*/

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

                /*
                 Step 2 choose your interests
                 */
                $scope.roles = interestsFactory.getInterestes();

                $scope.user = {
                    roles: []
                };
                $scope.checkAll = function () {
                    $scope.user.roles = angular.copy($scope.roles);
                };
                $scope.uncheckAll = function () {
                    $scope.user.roles = [];
                };
                $scope.checkFirst = function () {
                    $scope.user.roles.splice(0, $scope.user.roles.length);
                };
                /*
                 Step 3 choose your budget
                 */
                $scope.budget = 1;

                $scope.setBudget = function (newBudget) {
                    $scope.budget = newBudget;
                };

                /*
                 Step 4 choose your departure and return dates.
                 */
                $scope.date_depart = new Date();
                $scope.date_return = new Date();
                $scope.date_return.setDate($scope.date_return.getDate() + 1);

                /*
                 Results
                 */

                /*
                 Retrieve data from Firebase db based on the search fields: Foar the moment will be only
                 countries
                 */
                $scope.advisors = [
                    {
                        first_name: "Arnon",
                        last_name: "Benshahar",
                        title: "Best guide in the middle east",
                        price: 50,
                        interests: ["Museums", "Nature", "Beaches"],
                        countries: ["Jordan", "Israel", "China"],
                        description: "I will give the best trip you can imagine please select me.",
                        image: "/images/arnon.jpg",
                        reviews: 0,
                        rate: 4
                    },
                    {
                        first_name: "Ben",
                        last_name: "Eshel",
                        title: "Best guide in the middle east",
                        price: 30,
                        interests: ["Museums", "Nature", "Beaches"],
                        countries: ["Jordan", "Israel", "China"],
                        description: "I will give the best trip you can imagine please select me.",
                        image: "/images/beneshel.jpg",
                        reviews: 0,
                        rate: 3
                    }

                ];
                $scope.ratings = [{
                        current: 5,
                        max: 10
                    }, {
                        current: 3,
                        max: 5
                    }];

                $scope.getResults = function () {
                    searchAdvisor.setCountries($scope.destinationsList);
                    $location.path('/results')
                };

            }]);
