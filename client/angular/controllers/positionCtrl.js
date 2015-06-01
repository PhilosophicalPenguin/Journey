function positionCtrl($scope, $http, $location, $stateParams, statsFactory){
  
  $scope.positionID = $stateParams.positionID; 

  statsFactory.getStats('Senior Backend Engineer');
  $scope.stats = statsFactory;
  
}

angular.module('journeyApp')
.controller('positionCtrl', ['$scope', '$http', '$location', '$stateParams', 'statsFactory', positionCtrl]);
