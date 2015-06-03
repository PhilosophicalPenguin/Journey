function testCtrl($scope, $http){
  $scope.Testing = 'This is a test!';
  $scope.results = [];


  $scope.positions = ['Software engineer', 'Circus Clown'];

  $scope.getStats = function(name){

    console.log('calling name', name);
    
    var req = {
      method: 'GET',
      url: '/api/positionQuery/getStats',
      params: { name: name }
    }

    $http(req)
    .success(function(resp){

      console.log('response from server:', resp);
      
      $scope.degrees = [];
      $scope.schools = [];
      $scope.fieldsOfStudy = [];
      $scope.degreesAndFields = [];

      // Construct degree objects with percentages and degree name
      var objConstructor = function(array, obj){
        for (var key in obj){
          if(key != 'total'){
            var item = {};
            item.name = key;
            item.percentage = obj[key] / obj.total;
            array.push(item);          
          }
        }
      };
      
      objConstructor($scope.degrees, resp.degrees);
      objConstructor($scope.schools, resp.schools);
      objConstructor($scope.fieldsOfStudy, resp.fieldsOfStudy);
      objConstructor($scope.degreesAndFields, resp.degreesAndFields);
    })
    .error(function(){
      console.log('error', error)
    });
  };

  $scope.degrees 


}

angular.module('journey', [])
.controller('testCtrl', testCtrl);
