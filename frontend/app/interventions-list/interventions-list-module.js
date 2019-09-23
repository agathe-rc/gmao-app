'use strict';

var app = angular.module('interventionsApp', []);

app.controller('interventionsController', function($scope, $filter, $http){
  // On page load : fetch data in GET request
  $http.get('http://127.0.0.1:7000/api/interventions/')
  .then(function(response){
    $scope.interventionsList = response.data;
  });

  // Sorting by date
  let orderBy = $filter('orderBy');
  $scope.sortBy = function(reverse){
    $scope.interventionsList = orderBy($scope.interventionsList, 'date', reverse);
  };

  // Create new intervention
  $scope.create = function(){
    $http.post('http://127.0.0.1:7000/api/interventions/', $scope.currentIntervention)
    .then(function(response){
      console.log('Created')
      window.location.reload();
    });
  };

  // Modify data by intervention ID
  $scope.modify = function(pk){
    $http.put(`http://127.0.0.1:7000/api/interventions/${pk}/`, $scope.currentIntervention)
    .then(function(response){
      console.log('Updated');
      window.location.reload();
    });
  };

  // Get data by intervention ID
  $scope.get = function(pk){
    $http.get(`http://127.0.0.1:7000/api/interventions/${pk}/`)
    .then(function(response){
      $scope.currentIntervention = response.data
      $scope.currentIntervention.date = new Date($scope.currentIntervention.date)
    });
  };

  $scope.delete = function(pk){
    if (confirm('Are you sure you want to delete ?')) {
      // Send ID of intervention to be deleted
      $http.delete(`http://127.0.0.1:7000/api/interventions/${pk}/`)
      .then(function(response){
        console.log('Deleted');
        window.location.reload();
      });
    }
  };

  // Display modal with content if Edit - nothing if New
  $scope.displayModal = function(pk){
    $scope.isNew = true;
    $scope.currentId = pk;
    $scope.currentIntervention = {};

    if ($scope.currentId) {
      $scope.isNew = false
      $scope.get($scope.currentId)
    }

    $('.modal').modal('show');
  };

  $scope.createOrEdit = function(){
    // If new intervention : status is Draft
    if (!$scope.currentIntervention['status']){
      $scope.currentIntervention['status'] = 'd';
    // If all fields are filled : status is Validated
    } else if ($scope.isFormFilled()){
      $scope.currentIntervention['status'] = 'v';
    // If date is passed : status is Closed
    } else if ($scope.isDatePassed()){
      $scope.currentIntervention['status'] = 'c'
    }

    $scope.currentId ? $scope.modify($scope.currentId) : $scope.create()
  };

  $scope.isFormFilled = function(){
    let isFilled = true;
    $('input.form-control').each(function(){
      if ($(this).val() == ''){
        isFilled = false
      }
    });
    return isFilled;
  };

  $scope.isDatePassed = function(){
    console.log($scope.currentIntervention.date < new Date())
    return $scope.currentIntervention.date < new Date()
  };

  $scope.getStatus = function(letter){
    switch (letter){
      case 'd':
        return 'Brouillon'
      case 'v':
        return 'Validé'
      case 'c':
        return 'Terminé'
    }
  }
});