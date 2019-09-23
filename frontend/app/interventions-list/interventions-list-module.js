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
      $('.modal').modal('close');
      window.location.reload();
    });
  };

  // Modify data by intervention ID
  $scope.modify = function(pk){
    $http.put(`http://127.0.0.1:7000/api/interventions/${pk}/`, $scope.currentIntervention)
    .then(function(response){
      console.log('Updated');
      $('.modal').modal('close');
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
        $('.modal').modal('close');
        window.location.reload();
      });
    }
  };

  // Display modal with content if Edit - nothing if New
  $scope.displayModal = function(pk){
    $scope.currentId = pk;
    $scope.currentIntervention = {}

    if ($scope.currentId) {
      $scope.get($scope.currentId)
    }

    $('.modal').modal('show');
  };

  $scope.createOrEdit = function(){
    if (!$scope.currentIntervention['status']) {
      $scope.currentIntervention['status'] = 'd';
    } else if ('all fields are filled') {
      // status = validé
    }
    $scope.currentId ? $scope.modify($scope.currentId) : $scope.create()
  }

});

  // ********* TODO:
  // If all fields : status=Validé
  // If date passed : status=Terminé
  // If fields required not filled = bouton disabled
  // PB bootstrap ?
  // favicon