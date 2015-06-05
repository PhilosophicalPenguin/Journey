function homeCtrl($scope, $location){
  
  $scope.positions = [
    {
      name: 'Architect and Lead Backend Engineer',
      id: 1
    },
    {
      name: 'CTO',
      id: 2
    },
    {
      name: 'Development Lead and Technology Consultant',
      id: 3
    }
  ];

  $scope.getPosition = function(id){
    $location.path('/position/' + id);
  };
  
}

angular.module('journeyApp')
.controller('homeCtrl', ['$scope', '$location', homeCtrl]);
