function homeCtrl($scope, $location){
  
  $scope.positions = [
    {
      name: 'Senior Backend Engineer',
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
