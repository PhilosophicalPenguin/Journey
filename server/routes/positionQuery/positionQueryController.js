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
        new Position().where({
                position_name: request.query.name
            })
            .fetch()
            .then(function(position) {
                if (!position) { // invalid position name can not find such a position in the database
                    console.log('Did not find position.');
                    // response.writeHead(404)
                    response.send({
                        errorMessage: 'That position does not exist in our database.'
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
                    var makeTally = function(subject, property, profile) {
                        return function(object) {
                            var profile = {
                                id: object.profile_id,
                                name: object.profile_name,
                                picURL: object.picURL,
                                headline: object.headline
                            }
                            if (profile.picURL === null) {
                                profile.picURL = 'http://bridgesprep.org/wp-content/uploads/2013/10/Facebook-no-profile-picture-icon-620x389.jpg';
                            }
                            var val = object[property];
                            result[subject][val] = result[subject][val] || [];
                            result[subject][val].push(profile);
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
                                    var profile = {
                                        id: object.profile_id,
                                        name: object.profile_name,
                                        picURL: object.picURL,
                                        headline: object.headline
                                    }

                                    if (profile.picURL === null) {
                                        profile.picURL = 'http://bridgesprep.org/wp-content/uploads/2013/10/Facebook-no-profile-picture-icon-620x389.jpg';
                                    }

                                    result.degreesAndFields[val] = result.degreesAndFields[val] || [];
                                    result.degreesAndFields[val].push(profile);
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

                    var getEducationStatsAsync = Promise.promisify(getEducationStats);
                    var getExperienceStatsAsync = Promise.promisify(getExperienceStats);
                    var getSkillStatsAsync = Promise.promisify(getSkillStats);

                    getEducationStatsAsync().then(function() {
                        return getExperienceStatsAsync()
                    }).then(function() {
                        return getSkillStatsAsync()
                    }).then(function() {
                        console.log('Returning stats for:', request.query.name);

                        //remove duplicates from result.companies
                        result.companies = _.object(_.map(result.companies, function(val, key) {

                            val = _.uniq(val, false, function(person) {
                                return JSON.stringify(person)
                            })

                            return [key, val]
                            
                        }))
                        //recalculate new total # of companies
                        var newCompanyTotal = 0;

                        for(var company in result.companies){
                          if(company!== "total"){
                            newCompanyTotal += result.companies[company].length
                          }
                        }

                        result.companies.total = newCompanyTotal;











                        //remove duplicates from result.degrees
                        result.degrees = _.object(_.map(result.degrees, function(val, key) {

                            val = _.uniq(val, false, function(person) {
                                return JSON.stringify(person)
                            })

                            return [key, val]

                        }))
                        //recalculate new total # of degrees
                        var newDegreeTotal = 0;

                        for(var degree in result.degrees){
                          if(degree!== "total"){
                            newDegreeTotal += result.degrees[degree].length
                          }
                        }

                        result.degrees.total = newDegreeTotal;



                        //remove duplicates from result.degreesAndFields
                        result.degreesAndFields = _.object(_.map(result.degreesAndFields, function(val, key) {

                            val = _.uniq(val, false, function(person) {
                                return JSON.stringify(person)
                            })

                            return [key, val]

                        }))
                        //recalculate new total # of degreesAndFields
                        var newDegreeAndFieldTotal = 0;

                        for(var degreeAndField in result.degreesAndFields){
                          if(degreeAndField!== "total"){
                            newDegreeAndFieldTotal += result.degreesAndFields[degreeAndField].length
                          }
                        }

                        result.degreesAndFields.total = newDegreeAndFieldTotal;





                        //remove duplicates from result.fieldsOfStudy
                        result.fieldsOfStudy = _.object(_.map(result.fieldsOfStudy, function(val, key) {

                            val = _.uniq(val, false, function(person) {
                                return JSON.stringify(person)
                            })

                            return [key, val]

                        }))
                        //recalculate new total # of fieldsOfStudy
                        var newfieldsOfStudyTotal = 0;

                        for(var fieldOfStudy in result.fieldsOfStudy){
                          if(fieldOfStudy!== "total"){
                            newfieldsOfStudyTotal += result.fieldsOfStudy[fieldOfStudy].length
                          }
                        }

                        result.fieldsOfStudy.total = newfieldsOfStudyTotal;





                        //remove duplicates from result.positions
                        result.positions = _.object(_.map(result.positions, function(val, key) {

                            val = _.uniq(val, false, function(person) {
                                return JSON.stringify(person)
                            })

                            return [key, val]

                        }))
                        //recalculate new total # of positions
                        var newpositionsTotal = 0;

                        for(var personPosition in result.positions){
                          if(personPosition!== "total"){
                            newpositionsTotal += result.positions[personPosition].length
                          }
                        }

                        result.positions.total = newpositionsTotal;






                        //remove duplicates from result.schools
                        result.schools = _.object(_.map(result.schools, function(val, key) {

                            val = _.uniq(val, false, function(person) {
                                return JSON.stringify(person)
                            })

                            return [key, val]

                        }))
                        //recalculate new total # of schools
                        var newSchoolsTotal = 0;

                        for(var school in result.schools){
                          if(school!== "total"){
                            newSchoolsTotal += result.schools[school].length
                          }
                        }

                        result.schools.total = newSchoolsTotal;





                        //remove duplicates from result.skills
                        result.skills = _.object(_.map(result.skills, function(val, key) {

                            val = _.uniq(val, false, function(person) {
                                return JSON.stringify(person)
                            })

                            return [key, val]

                        }))
                        //recalculate new total # of skills
                        var newSkillsTotal = 0;

                        for(var skill in result.skills){
                          if(skill!== "total"){
                            newSkillsTotal += result.skills[skill].length
                          }
                        }

                        result.skills.total = newSkillsTotal;







                        response.json(result)
                    });

                }

            })
    }
}
