var Position = require('../../db_Schemas/models/position');
var Profile = require('../../db_Schemas/models/profile');
var db = require('../../db_Schemas/config');
var Promise = require("bluebird");
var _ = require("underscore");
var helpers = require('../../helpers/helper.js');
var queries = require('../../helpers/queries.js');

module.exports = {

  // Returns all current positions of profiles in database
  getAvailablePositions: function(request, response) {
    db.knex.from('profiles')
      .innerJoin('positions', 'profiles.currentPosition_id', 'positions.id')
      .then(function(profiles) {

        var positionsHash = {}

        for(var i = 0; i < profiles.length; i++) {
          var currentPosID = profiles[i].currentPosition_id
          
          if(positionsHash[currentPosID] === undefined) {
            positionsHash[currentPosID] = {
              position_id: currentPosID,
              position_name: profiles[i].position_name,
              count: 1
            }
          }
          else {
            positionsHash[currentPosID].count++;
          }
        }

        var positionArray = [];

        for(var key in positionsHash) {
          if(positionsHash[key].count >= 5) {
            positionArray.push(positionsHash[key]);
          }
        }

        response.json(positionArray);
      });
  },

  // Returns all positions in database - current and non-current
  getAllPositions: function(request, response) {
    new Position().fetchAll().then(function(positions) {
      if (positions) {
        var positionArray = [];
        helpers.forEach(positions.models, function(position) {
          //pull off id and position_name off each object
          positionArray.push({
            "position_id"   : position.attributes.id,
            "position_name" : position.attributes.position_name
          });
        });
        response.json(positionArray);
      }
    });
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
            currentPositionHolders: {
              people: []
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

          var tallyDegreeAndField = makeTally('degreesAndFields', 'degreeAndField_name', result);
          var tallyCompanies      = makeTally('companies',        'company_name',        result);
          var tallyPositions      = makeTally('positions',        'position_name',       result);
          var tallySkills         = makeTally('skills',           'skill_name',          result);

          var getCurrentPositionHolders = function(callback) {
            Profile
              .where({currentPosition_id: positionID})
              .fetchAll({withRelated: ['currentPosition']})
              .then(function(data){

                data.models.forEach(function(person){
                  var obj = {
                    id:         person.attributes.id,
                    name:       person.attributes.profile_name,
                    picURL:     person.attributes.picURL,
                    headline:   person.attributes.headline
                  }
                  result.currentPositionHolders.people.push(obj);
                });

                callback();
              })
          };

          var recordEducationStats = function(getEducationStatsCB) {
            queries.getEducationStats(positionID, function(data) {
                _(data).map(function (object) {
                  object.degreeAndField_name = object.degree_name.toString() + '_' + object.fieldOfStudy_name.toString();
                  return object;
                });
                
                helpers.forEach(data, tallyDegreeAndField);
                getEducationStatsCB();
              });
          };

          var recordExperienceStats = function(getExperienceStatsCB) {
            queries.getExperienceStats(positionID, function(data) {
              helpers.forEach(data, tallyCompanies, tallyPositions);
              getExperienceStatsCB();
            });
          };

          var recordSkillStats = function(getSkillStatsCB) {
            queries.getSkillStats(positionID,function(data) {
                helpers.forEach(data, tallySkills);
                getSkillStatsCB();
            });
          }

          var getCurrentPositionHoldersAsync  = Promise.promisify(getCurrentPositionHolders);
          var getEducationStatsAsync  = Promise.promisify(recordEducationStats);
          var getExperienceStatsAsync = Promise.promisify(recordExperienceStats);
          var getSkillStatsAsync      = Promise.promisify(recordSkillStats);


          getEducationStatsAsync().then(function() {
            return getExperienceStatsAsync()
          })
          .then(function() {
            return getCurrentPositionHoldersAsync();
          })
          .then(function() {
            return getSkillStatsAsync();
          })
          .then(function() {
            response.json(result);
        });

      }
    });
  }, // End of getStatsOnPosition


  getNavFromPositions: function(request, response) {

  var fromPositions = {};

  db.knex
    .select('position_id', 'position_name')
    .from('expMilestones')
    .innerJoin('profiles', 'expMilestones.profile_id', 'profiles.id')
    .innerJoin('positions', 'positions.id', 'expMilestones.position_id')
    .where({
      currentPosition_id: request.query.id
    })
    .then(function(data) {
      var tempObj = {};

      data.forEach(function(position) {
        if (!tempObj.hasOwnProperty(position["position_id"])) {
          tempObj[position["position_id"]] = position["position_name"]
        }
      });

      for (var positionID in tempObj) {
        var key           = tempObj[positionID],
            val           = positionID,
            positionToAdd = {};

        var newVal = parseInt(val);
        fromPositions[key] = newVal;
      }
      response.json(fromPositions);

    });
  },

  getFilterOnPosition: function(request, response) {
    var toID            =   request.query.toID,
        fromID          =   request.query.fromID,
        result          =   {},
        positionNames   =   {},
        resultArr       =   [];

    var getPositionName = function (id, target, callback) {
      Position.forge( { 'id' : id } )
      .fetch()
      .then(function(position){
        positionNames[target] = position.attributes.position_name;
        positionNames[target + 'ID'] = id;
        callback();
      });
    }

    var getFilterProfiles = function(callback) {
      db.knex.from('expMilestones')
      .innerJoin('profiles', 'expMilestones.profile_id', 'profiles.id')
      .innerJoin('companies', 'expMilestones.company_id', 'companies.id')
      .innerJoin('positions', 'expMilestones.position_id', 'positions.id')
      .where({ currentPosition_id: toID })
      .andWhere({ position_id: fromID })
      .then(function(data) {


        for(var i = 0; i < data.length; i++) {
          var profile = data[i];
        console.log("PROFILE IN GET FILTER PROFILES", profile);
          var filteredProfile = {
            id:                 profile.profile_id,
            name:               profile.profile_name,
            picURL:             profile.picURL,
            headline:           profile.headline,
            currentPositionID:  profile.currentPosition_id,
            currentCompany:     profile.currentCompany_id,
            currentLocation:    profile.currentLocation,
            currentStart:       profile.currentPosition_startDate,
            filteredPosition:   profile.position_name,
            filteredCompany:    profile.company_name,
            filteredStart:      parseInt(profile.start_date),
            filteredEnd:        parseInt(profile.end_date)
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

        for (var key in result) {
          resultArr.push(result[key]);
        }

        response.json(resultArr);

      });
    }

    var getPositionNameAsync = Promise.promisify(getPositionName);
    var getFilterProfilesAsync = Promise.promisify(getFilterProfiles);

    getPositionNameAsync(toID, 'toPosition').then(function(){
      return getPositionNameAsync(fromID, 'fromPosition')
    })
    .then(function(){
      resultArr.push(positionNames);
      getFilterProfilesAsync();
    });
  }

}

// Create helper function to calculate stats of each table
function makeTally (subject, property, result) {
  return function(object) {
    var profile = {
      id:       object.profile_id,
      name:     object.profile_name,
      picURL:   object.picURL,
      headline: object.headline
    }

    var val = object[property];
    result[subject][val] = result[subject][val] || [];
    result[subject][val].push(profile);
    ++result[subject].total;

    if(subject === 'positions'){
      var positionID    = object.position_id;
      var positionName  = object.position_name;
      result[subject].positionsSummary[positionName] = positionID;
    }

  };
};
