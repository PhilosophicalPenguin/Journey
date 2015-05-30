function homeCtrl($scope, $location){
  
  $scope.positions = [
    {
      name: 'Software engineer',
      id: 1
    },
    {
      name: 'Circus Clown',
      id: 2
    }
  ];

  $scope.getPosition = function(id){
    $location.path('/position/' + id);
  };
  
}

angular.module('journeyApp')
.controller('homeCtrl', ['$scope', '$location', homeCtrl]);
