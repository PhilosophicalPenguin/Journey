function positionCtrl($scope, $http, $location, $stateParams, statsFactory){
  
  $scope.positionID = $stateParams.positionID; 

  statsFactory.getStats('Software engineer');
  $scope.stats = statsFactory;
  
}

angular.module('journeyApp')
.controller('positionCtrl', ['$scope', '$http', '$location', '$stateParams', 'statsFactory', positionCtrl]);
