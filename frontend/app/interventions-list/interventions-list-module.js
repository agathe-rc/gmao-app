'use strict';

var app = angular.module('interventionsApp', []);

app.controller('interventionsController', function($scope, $filter, $http){
  
  /*************** UTILS ***************/
  // Sorting by date
  let orderBy = $filter('orderBy');
  $scope.sortBy = function(reverse){
    $scope.interventionsList = orderBy($scope.interventionsList, 'date', reverse);
  };

  // Check if all modal form fields are filled
  $scope.isFormFilled = function(){
    let isFilled = true;
    $('input.form-control').each(function(){
      if ($(this).val() == ''){
        isFilled = false;
      }
    });
    return isFilled;
  };

  // Check if date is passed
  $scope.isDatePassed = function(){
    return $scope.currentIntervention.date < new Date();
  };

  // Get wording for status codes
  $scope.getStatus = function(letter){
    switch (letter){
      case 'd':
        return 'Brouillon';
      case 'v':
        return 'Validé';
      case 'c':
        return 'Terminé';
    };
  };

  /*************** ACTIONS ***************/
  // Display list on page load : fetch data in GET request
  $http.get('http://127.0.0.1:7000/api/interventions/')
  .then(function(response){
    $scope.interventionsList = response.data;
  });

  // Create new intervention
  $scope.create = function(){
    $http.post('http://127.0.0.1:7000/api/interventions/', $scope.currentIntervention)
    .then(function(){
      window.location.reload();
    });
  };

  // Modify specific intervention by ID
  $scope.modify = function(pk){
    $http.put(`http://127.0.0.1:7000/api/interventions/${pk}/`, $scope.currentIntervention)
    .then(function(){
      window.location.reload();
    });
  };

  // Get specific intervention by ID
  $scope.get = function(pk){
    $http.get(`http://127.0.0.1:7000/api/interventions/${pk}/`)
    .then(function(response){
      $scope.currentIntervention = response.data;
      // Transform date into JS Date object
      $scope.currentIntervention.date = new Date($scope.currentIntervention.date);
    });
  };

  // Delete specific intervention by ID
  $scope.delete = function(pk){
    if (confirm('Êtes-vous certain.e de vouloir supprimer cette intervention ?')) {
      $http.delete(`http://127.0.0.1:7000/api/interventions/${pk}/`)
      .then(function(){
        window.location.reload();
      });
    }
  };

  // Display modal with content if Edit - nothing if New
  $scope.displayModal = function(pk){
    $scope.isNew = true;
    $scope.currentId = pk;
    $scope.currentIntervention = {};

    // If current ID : we are in modification mode, thus we fetch the intervention
    if ($scope.currentId) {
      $scope.isNew = false;
      $scope.get($scope.currentId);
    }

    $('.modal').modal('show');
  };

  $scope.createOrEdit = function(){
    // New intervention : status is Draft
    !$scope.currentIntervention['status'] && ($scope.currentIntervention['status'] = 'd');
    // All fields are filled : status is Validated
    $scope.isFormFilled() && ($scope.currentIntervention['status'] = 'v');
    // Date is passed : status is Closed
    $scope.isDatePassed() && ($scope.currentIntervention['status'] = 'c');

    // Modify or create intervention
    $scope.currentId ? $scope.modify($scope.currentId) : $scope.create();
  };
});