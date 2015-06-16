var basicServer = require('../index.js');
var request = require('request');
require('jasmine-expect');

describe('Journey Server', function() {

    it('should respond with stats relating to a position', function(done) {
        request('http://localhost:3000/api/queryPositions/getStats?id=9', function(error, response, body) {
            expect(body).toContain('degreesAndFields');
            expect(body).toContain('companies');
            expect(body).toContain('position_name');
            expect(body).toContain('positions');
            expect(body).toContain('skills');
            done();
        });
    });

    it('should have totals that equal the sum of the stats', function(done) {
        request('http://localhost:3000/api/queryPositions/getStats?id=9', function(error, response, body) {
            body = JSON.parse(body);
            var getTotal = function(table) { //degrees and fields
                var result = 0;
                for (var key in body[table]) {
                    if (key != 'total' && key != 'positionsSummary') {

                        result += body[table][key].length
                    }
                }
                return result;
            };

            var degreesAndFieldsTotal = getTotal('degreesAndFields');
            var companiesTotal = getTotal('companies');
            var positionsTotal = getTotal('positions');
            var skillsTotal = getTotal('skills');

            expect(body.degreesAndFields.total).toBe(degreesAndFieldsTotal);
            expect(body.companies.total).toBe(companiesTotal);
            expect(body.positions.total).toBe(positionsTotal);
            expect(body.skills.total).toBe(skillsTotal);

            done();
        });
    });

    it('should respond with stats relating to a position', function(done) {
        request('http://localhost:3000/api/queryPositions/getPositions', function(error, response, body) {
            body = JSON.parse(body);

            expect(body).toBeArray();
            expect(body.length).toBeGreaterThan(0);
            for (var i = 0; i < body.length; i++) {
                expect(body[i].hasOwnProperty('position_name')).toBeTrue();
                expect(body[i]['position_name']).toBeString();
                expect(body[i].hasOwnProperty('position_id')).toBeTrue();
                expect(body[i]['position_id']).toBeNumber();
            }
            done();
        });
    });

    it('should get all previous positions for any given current position', function(done) {
        request('http://localhost:3000/api/queryPositions/getNav?id=2', function(error, response, body) {
            body = JSON.parse(body);

            expect(body).toBeObject();

            // figure out how to test if there are no previous positions for any given current position, how to account for this
            // expect(Object.keys(body).length).toBeGreaterThan(0);
            for (var k in body) {
                expect(k).toBeString();
                expect(body[k]).toBeNumber();
                expect(k).toBeDefined();

            }
            done();
        });
    });

    it('should get all previous positions for any given current position', function(done) {
        request('http://localhost:3000/api/queryPositions/getFilter?fromID=10&toID=9', function(error, response, body) {
            body = JSON.parse(body);

            expect(body).toBeArray();

            expect(body[0].toPosition).toBeString();
            expect(body[0].toPositionID).toBeString();
            expect(body[0].fromPosition).toBeString();
            expect(body[0].fromPositionID).toBeString();

            done();
        });
    });


    it('should get all previous positions for any given current position', function(done) {
        request('http://localhost:3000/api/profiles/getProfile?id=1', function(error, response, body) {
            body = JSON.parse(body);
            expect(body).toBeObject();
            expect(body.degrees).toBeArray();
            expect(body.experiences).toBeArray();
            expect(body.skills).toBeArray();
            expect(body.id).toBeNumber();
            expect(body.name).toBeString();
            expect(body.linkedin).toBeString();
            expect(body.pic).toBeString();
            expect(body.location).toBeString();
            expect(body.headline).toBeString();
            done();
        });
    });

    it('should get all previous positions for any given current position', function(done) {
        request('http://localhost:3000/api/profiles/getProfilesFromIndustry?IndustryName=Internet', function(error, response, body) {
            body = JSON.parse(body);

            expect(body).toBeArray();
            body.forEach(function(personInSimilarIndustry) {
                expect(personInSimilarIndustry.id).toBeNumber();
                expect(personInSimilarIndustry.headline).toBeString();
                expect(personInSimilarIndustry.picURL).toBeString();
                expect(personInSimilarIndustry.profile_name).toBeString();
            })
            done();
        });
    });

});
