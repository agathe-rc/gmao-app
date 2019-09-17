'use strict';

var interventionsApp = angular.module('interventionsApp', []);

interventionsApp.controller('interventionsCtrl', function interventionsCtrl($scope, $http){
    $http.get('localhost:7000/api/interventions/')
    .then(function(response) {
      $scope.interventions = response.data;
    });
});