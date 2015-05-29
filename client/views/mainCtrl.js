function mainCtrl($scope, $location){

  $scope.goHome = function(){
    $location.path('/');
  };
  
}

angular.module('journeyApp')
.controller('mainCtrl', ['$scope', '$location', mainCtrl]);
