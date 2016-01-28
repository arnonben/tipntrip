'use strict';

/**
 * @ngdoc service
 * @name tipntripApp.searchAdvisor
 * @description
 * # searchAdvisor
 * Service in the tipntripApp.
 */
 angular.module('tipntripApp')
 .factory('searchAdvisor', function () {
     var searchfac ={};
     searchfac.searchDetails = {countries:{},interests:{},budget:0,dates:{departDate:"",returnDate:""}};

     searchfac.setCountries = function(countries){
       searchfac.searchDetails.countries = countries;
   }

   searchfac.getCountries = function(){
       return searchfac.searchDetails.countries;
   };

   searchfac.setInterests= function (interests){
       searchfac.searchDetails.interests = interests;
   };

   searchfac.getInterests = function(){
       return searchfac.searchDetails.interests;
   };

   searchfac.setBudget = function(budget){
       searchfac.searchDetails.budget = budget;
   };

   searchfac.getBudget = function(){
       return searchfac.searchDetails.budget;
   };

   searchfac.setDates= function(departDate,returnDate){
       searchfac.searchDetails.dates.departDate = departDate;
       searchfac.searchDetails.dates.returnDate = returnDate;
   };

   searchfac.getDates = function(){
       return searchfac.searchDetails.dates;
   };
   return searchfac;
});
