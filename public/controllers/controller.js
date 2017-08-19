var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("I am in controller");
    $scope.filteredTodos = []
   ,$scope.currentPage = 1
   ,$scope.numPerPage = 3
   ,$scope.maxSize = 5;
   
var refresh = function() {
  $http.get('/bookday').success(function(response) {
    console.log("Geter");
    $scope.bookday = response;
	console.log($scope.bookday);
	$scope.len=$scope.bookday.length;
	$scope.page=Math.ceil($scope.len/$scope.numPerPage);
	console.log($scope.page);
    $scope.contact = "";
  });
};
refresh();
//pagination
  $scope.numPages = function () {
	$http.get('/bookday').success(function(response) {
    $scope.bookday = response;
    $scope.numPages= Math.ceil($scope.bookday.length / $scope.numPerPage);
  });  
  };
  
  $scope.$watch('currentPage + numPerPage', function() {
	$http.get('/bookday').success(function(response) {
	var begin = (($scope.currentPage - 1) * $scope.numPerPage);
    var end = begin + $scope.numPerPage; 
    $scope.filteredTodos = $scope.bookday.slice(begin, end);
	}); 
  });  
//End pagination
$scope.addContact = function() {
  console.log($scope.contact);
  //---------------
    d0 = new Date($scope.contact.dataB);
	d1 = new Date();
	dt = (d1.getTime() - d0.getTime()) / (1000*60*60*24);
	dtRound = Math.round(dt);
	$scope.contact.registr=d1;
	//--
  $http.post('/bookday', $scope.contact).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/bookday/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/bookday/' + id).success(function(response) {
    $scope.contact = response;
  });
};  

$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/bookday/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}

}]);﻿