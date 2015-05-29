function statsFactory($http){
  var statsFactory = {};
  
  statsFactory.getStats = function(name){
    
    var req = {
      method: 'GET',
      url: '/getStats',
      params: { name: name }
    }

    $http(req)
    .success(function(resp){
      
      statsFactory.degrees = [];
      statsFactory.schools = [];
      statsFactory.fieldsOfStudy = [];
      statsFactory.degreesAndFields = [];

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
      
      objConstructor(statsFactory.degrees, resp.degrees);
      objConstructor(statsFactory.schools, resp.schools);
      objConstructor(statsFactory.fieldsOfStudy, resp.fieldsOfStudy);
      objConstructor(statsFactory.degreesAndFields, resp.degreesAndFields);
    })
    .error(function(){
      console.log('error', error)
    });
  };



  return statsFactory;
}

angular.module('journeyApp')
.factory('statsFactory', ['$http', statsFactory]);