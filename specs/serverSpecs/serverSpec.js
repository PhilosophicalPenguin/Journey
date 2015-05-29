var basicServer = require('../../index.js');
var request = require('request');

describe('Journey Server', function() {
    
    it('should respond with stats relating to Software engineer', function(done) {
      request('http://localhost:3000/getStats?name=Software+engineer', function(error, response, body){
        expect(body).toContain('degrees');
        expect(body).toContain('fieldsOfStudy');
        expect(body).toContain('schools');
        expect(body).toContain('degreesAndFields');
        done();
      });
    });

    it('should have totals that equal the sum of the stats', function(done) {
      request('http://localhost:3000/getStats?name=Software+engineer', function(error, response, body){
        body = JSON.parse(body);
        var getTotal = function(table){
          var result = 0;
          for (var key in body[table]){
            if(key != 'total'){
              result += body[table][key]
            }
          }
          return result;
        };

        var degreesTotal = getTotal('degrees');
        var fieldsOfStudyTotal = getTotal('fieldsOfStudy');
        var schoolsTotal = getTotal('schools');
        var degreesAndFieldsTotal = getTotal('degreesAndFields');

        expect(body.degrees.total).toBe(degreesTotal);
        expect(body.fieldsOfStudy.total).toBe(fieldsOfStudyTotal);
        expect(body.schools.total).toBe(schoolsTotal);
        expect(body.degreesAndFields.total).toBe(degreesAndFieldsTotal);
        
        done();
      });
    });


});

