function statsFactory($http){
  var statsFact = {};
  
  statsFactory.getStats = function(name){
    
    var req = {
      method: 'GET',
      url: '/api/positionQuery/getStats',
      params: { name: name }
    };

    $http(req)
    .success(function(resp){
      
      statsFact.degrees = [];
      statsFact.schools = [];
      statsFact.fieldsOfStudy = [];
      statsFact.degreesAndFields = [];

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
      
      objConstructor(statsFact.degrees, resp.degrees);
      objConstructor(statsFact.schools, resp.schools);
      objConstructor(statsFact.fieldsOfStudy, resp.fieldsOfStudy);
      objConstructor(statsFact.degreesAndFields, resp.degreesAndFields);
    })
    .error(function(){
      console.log('error', error);
    });
  };



  return statsFact;
}

angular.module('journeyApp')
.factory('statsFactory', ['$http', statsFactory]);
