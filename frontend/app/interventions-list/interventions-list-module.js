'use strict';

var app = angular.module('interventionsApp', []);

/***** INTERVENTIONS LIST *****/
app.controller('interventionsController', function($scope, $filter, $http){
  let orderBy = $filter('orderBy');

  // Fetch data in GET request
  $http.get('http://127.0.0.1:7000/api/interventions/')
  .then(function(response) {
    $scope.data = response.data;
  });

  $scope.modify = function(pk){
    // Get ID of intervention to be modified
    $http.get('http://127.0.0.1:7000/api/interventions/'+ pk)
    .then(function(response) {
      $scope.intervention = response.data
      $scope.intervention.date = new Date($scope.intervention.date)
    });
    $('.modal').modal('show');
  };

  $scope.delete = function(pk){
    if (confirm('Are you sure you want to delete ?')) {
      // Send ID of intervention to be deleted
      $http.delete('http://127.0.0.1:7000/api/interventions/'+ pk)
      .then(function(response) {
        console.log('Deleted');
        window.location.reload();
      });
    }
  };

  // Sorting by date 
  $scope.sortBy = function(reverse) {
    $scope.data = orderBy($scope.data, 'date', reverse);
  };
});

/***** HEADER *****/
app.controller('headerController', function($scope, $http){
  $scope.new = function() {
    // Empty form fields if new intervention is clicked
    $('.modal').find('form')[0].reset();
    $('.modal').modal('show');
  };
});

/***** MODAL *****/
app.controller('modalFormController', function($scope, $http){
  $scope.create = function(){
    //*********  TODO: IF all fields completed : status = v
    console.log($scope.intervention)
    //$scope.intervention['status'] = 'd'

    // Send form data to create new intervention
    /*
    $http.post('http://127.0.0.1:7000/api/interventions/', $scope.intervention)
    .then(function(response){
      console.log('Created')
      $('.modal').modal('close');
      window.location.reload();
    });
    */
  };

  // ********* TODO:
  // create(method, pk)
  // PUT request : retrieve PK ?
  // If all fields : status=Validé
  // If date passed : status=Terminé

});