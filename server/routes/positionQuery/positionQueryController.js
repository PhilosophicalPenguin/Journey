var Position = require('../../db_Schemas/models/position');
var db = require('../../db_Schemas/config');
var Promise = require("bluebird");

var forEach = function() {
  var list = arguments[0]; //grab the collection
  for (var i = 0; i < list.length; i++) { //iterate over collection
    for (var j = 1; j < arguments.length; j++) { // iterate over callbacks arguments[1] .. arguments[n]

      arguments[j](list[i], i, list);
    }
  }
};

module.exports = {
  getAvailablePositions: function(request, response) {
    console.log('im trying to get available positions');
    new Position().fetchAll().then(function(positions) {
      if (positions) {
        var positionArray = [];
        forEach(positions.models, function(position) {
          //pull off id and position_name off each object
          positionArray.push({
            "position_id": position.attributes.id,
            "position_name": position.attributes.position_name
          });
        });
        response.json(positionArray);
      }
    })

  },


  // name getStatsOnPosition
  //              - response to the client with information on degrees,
  //          experience and schools people have obtained/attended who
  //          have or had a job with the specified title
  // @param request {object} - contains information on the client and inforamtion
  //                            relating to their wants
  // @param response {object} - an object to respond with information in relation to the request

  getStatsOnPosition: function(request, response) {
    new Position().where({
        position_name: request.query.name
      })
      .fetch()
      .then(function(position) {
        if (!position) { // invalid position name can not find such a position in the database
          console.log('danger will robinson! didnt find position');
          // response.writeHead(404)
          response.send({
            errorMessage: 'that position does not exist in our database'
          });
        } else { //found the position requested
          var positionID = position.attributes.id;
          
          // creates object to store stats
          var result = {
            degrees: {
              total: 0
            },
            fieldsOfStudy: {
              total: 0
            },
            schools: {
              total: 0
            },
            degreesAndFields: {
              total: 0
            },
            companies: {
              total: 0
            },
            positions: {
              total: 0
            },
            skills: {
              total: 0
            }
          };

          // Create helper function to calculate stats of each table
          var makeTally = function(subject, property) {
            return function(object) {
              var val = object[property];
              result[subject][val] = result[subject][val] || 0;
              ++result[subject][val];
              ++result[subject].total;
            };
          };

          var getEducationStats = function(getEducationStatsCB) {
            //create a join table to retrieve all information of
            // people and their history, who have or had the job specified
            db.knex.from('eduMilestones')
              .innerJoin('profiles', 'eduMilestones.profile_id', 'profiles.id')
              .innerJoin('degrees', 'eduMilestones.degree_id', 'degrees.id')
              .innerJoin('schools', 'eduMilestones.school_id', 'schools.id')
              .innerJoin('fieldsOfStudy', 'eduMilestones.fieldOfStudy_id', 'fieldsOfStudy.id')
              .where({
                currentPosition_id: positionID
              })
              .then(function(data) {
                //create an object to tally information
                //and calculate statistics

                // creates function for tallying specified information
                // and recording it to a specified object

                var tallyDegreeAndField = function(object) {
                  var degreeName = object.degree_name.toString();
                  var fieldName = object.fieldOfStudy_name.toString();
                  var val = degreeName + '_' + fieldName;
                  if (result.degreesAndFields[val]) {
                    result.degreesAndFields[val]++;
                  } else {
                    result.degreesAndFields[val] = 1;
                  }
                  result.degreesAndFields.total++;
                }

                var tallyDegrees = makeTally('degrees', 'degree_name');
                var tallyFieldOfStudy = makeTally('fieldsOfStudy', 'fieldOfStudy_name');
                var tallySchools = makeTally('schools', 'school_name');

                forEach(data, tallyDegrees,
                  tallyFieldOfStudy,
                  tallySchools,
                  tallyDegreeAndField);

                getEducationStatsCB();
              })
          }

          var getExperienceStats = function(getExperienceStatsCB) {
            // create a join table to retrieve all experience info of
            // people and their history, who have or had the job specified
            db.knex.from('expMilestones')
              .innerJoin('profiles', 'expMilestones.profile_id', 'profiles.id')
              .innerJoin('companies', 'expMilestones.company_id', 'companies.id')
              .innerJoin('positions', 'expMilestones.position_id', 'positions.id')
              .where({
                currentPosition_id: positionID
              })
              .then(function(data) {
                var tallyCompanies = makeTally('companies', 'company_name');
                var tallyPositions = makeTally('positions', 'position_name');
                forEach(data, tallyCompanies,
                  tallyPositions
                );
                getExperienceStatsCB();
              })
          }

          var getSkillStats = function(getSkillStatsCB) {
            // create a join table to retrieve all skill stats
            db.knex.from('profiles_skills')
              .innerJoin('profiles', 'profiles_skills.profile_id', 'profiles.id')
              .innerJoin('skills', 'profiles_skills.skill_id', 'skills.id')
              .where({
                currentPosition_id: positionID
              })
              .then(function(data) {              
                var tallySkills = makeTally('skills', 'skill_name');
                forEach(data, tallySkills);
                getSkillStatsCB();
              })
          }

          var getEducationStatsAsync    =   Promise.promisify(getEducationStats);
          var getExperienceStatsAsync   =   Promise.promisify(getExperienceStats);
          var getSkillStatsAsync        =   Promise.promisify(getSkillStats);

          getEducationStatsAsync().then(function() {
            return getExperienceStatsAsync()
          }).then(function() {
            return getSkillStatsAsync()
          }).then(function() {
            console.log('this is the result!', result);
            response.json(result)
          });

        }

      })
  }
}

