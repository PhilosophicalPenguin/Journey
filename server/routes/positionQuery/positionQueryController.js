var Position = require('../../db_Schemas/models/position');
var Profile = require('../../db_Schemas/models/profile');
var db = require('../../db_Schemas/config');
var Promise = require("bluebird");
var _ = require("underscore");

var forEach = function() {
    var list = arguments[0]; //grab the collection
    for (var i = 0; i < list.length; i++) { //iterate over collection
        for (var j = 1; j < arguments.length; j++) { // iterate over callbacks arguments[1] .. arguments[n]

            arguments[j](list[i], i, list);
        }
    }
};

module.exports = {

    // Returns all current positions of profiles in database
    getAvailablePositions: function(request, response) {
      db.knex.from('profiles')
        .innerJoin('positions', 'profiles.currentPosition_id', 'positions.id')
        .then(function(profiles) {

          var positions = {};
          var positionArray = [];

          forEach(profiles, function(profile) {
          var positionID = profile.currentPosition_id,
          positionName = profile.position_name

          // if position is not in object, add it as a key: value --> positionID: positionName
          if (!positions[positionID] && positionName != null) {
            positions[positionID] = positionName;
          }

          });

          for (var key in positions) {
            positionArray.push({
              "position_id": parseInt(key),
              "position_name": positions[key]
            });
          }

          response.json(positionArray);
        });
  },

  // Returns all positions in database - current and non-current
  getAllPositions: function(request, response) {
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
    new Position().where({'id': request.query.id})
      .fetch()
      .then(function(position) {
        if (!position) { // invalid position name can not find such a position in the database
          console.log('Did not find position.');
          // response.writeHead(404)
          response.send({
            errorMessage: 'That position does not exist in our database.'
          });
        } else { //found the position requested
          var positionID  =   position.attributes.id;
          var filterID    =   request.query.filter;
          
          // creates object to store stats
          var result = {
            position_name : position.attributes.position_name,
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
              total: 0,
              positionsSummary: {}
            },
            skills: {
              total: 0
            }
          };

          // Create helper function to calculate stats of each table
          var makeTally = function(subject, property, profile) {
            return function(object) {
              var profile = {
                id:       object.profile_id,
                name:     object.profile_name,
                picURL:   object.picURL,
                headline: object.headline
              }
              if(profile.picURL === null) {
                profile.picURL = 'http://bridgesprep.org/wp-content/uploads/2013/10/Facebook-no-profile-picture-icon-620x389.jpg';
              }
              var val = object[property];
              result[subject][val] = result[subject][val] || [];
              result[subject][val].push(profile);
              ++result[subject].total;
              
              if(subject === 'positions'){
                var positionID = object.position_id;

                // result[subject].positionsSummary = {};
                result[subject].positionsSummary[positionID] = object.position_name;
                // console.log('!!!!!!!', result[subject].positionsSummary);
              }
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
                  var profile = {
                    id:       object.profile_id,
                    name:     object.profile_name,
                    picURL:   object.picURL,
                    headline: object.headline
                  }

                  if(profile.picURL === null) {
                    profile.picURL = 'http://bridgesprep.org/wp-content/uploads/2013/10/Facebook-no-profile-picture-icon-620x389.jpg';
                  }

                  result.degreesAndFields[val] = result.degreesAndFields[val] || [];
                  result.degreesAndFields[val].push(profile);
                  result.degreesAndFields.total++;
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

                forEach(data, tallyDegreeAndField);

                var getEducationStatsAsync = Promise.promisify(getEducationStats);
                var getExperienceStatsAsync = Promise.promisify(getExperienceStats);
                var getSkillStatsAsync = Promise.promisify(getSkillStats);


              getEducationStatsAsync().then(function() {
                    return getExperienceStatsAsync()
                }).then(function() {
                    return getSkillStatsAsync()
                }).then(function() {
                    console.log('Returning stats for:', request.query.id);

                function RemoveDuplicates(object) {
                  return _.object(_.map(object, function(val, key) {
                    val = _.uniq(val, false, function(item) {
                        return JSON.stringify(item)
                    });
                    return [key, val]
                  }));
                };

                function tally(object) {
                  object.total = 0;
                  for(var item in object) {
                    if(item !== 'total') {
                      object.total += object[item].length;
                    }
                  }
                 }

                 for(var keyR in result) {
                  if(keyR !== 'position_name') {
                    result[keyR] = RemoveDuplicates(result[keyR]);
                    tally(result[keyR]);
                  }
                 }
                response.json(result)
            });
      })
  }, // End of getStatsOnPosition

  getFilterOnPosition: function(request, response) {
    var positionID  =   request.query.positionID,
        filterID    =   request.query.filterID;

    db.knex.from('expMilestones')
    .innerJoin('profiles', 'expMilestones.profile_id', 'profiles.id')
    .innerJoin('companies', 'expMilestones.company_id', 'companies.id')
    .innerJoin('positions', 'expMilestones.position_id', 'positions.id')
    .where({ currentPosition_id: positionID })
    .andWhere({ position_id: filterID })
    .then(function(data) {

      var result = {};

      for(var i = 0; i < data.length; i++) {
        var profile = data[i];
        
        var filteredProfile = {
          id:               profile.profile_id,
          name:             profile.profile_name,
          picURL:           profile.picURL,
          headline:         profile.headline,
          currentPosition:  profile.currentPosition_id,
          currentCompany:   profile.currentCompany_id,
          currentLocation:  profile.currentLocation,
          // currentStart: ,
          // currentEnd: ,
          filteredPosition: profile.position_name,
          filteredCompany:  profile.company_name,
          filteredStart:    parseInt(profile.start_date),
          filteredEnd:      parseInt(profile.end_date)
        }

        if(result[profile.profile_id]) {
          if(result[profile.profile_id].filteredEnd < parseInt(profile.end_date)) {
            result[profile.profile_id] = filteredProfile;
          }
        }

        else if(!result[profile.profile_id]) {
          result[profile.profile_id] = filteredProfile; 
        }
      }

      console.log('data returned from getFilterOnPosition', result);
      response.json(result);
    });

  }

}