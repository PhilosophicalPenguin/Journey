var Position  =   require('../../db_Schemas/models/position');
var Profile   =   require('../../db_Schemas/models/profile');
var db        =   require('../../db_Schemas/config');
var Promise   =   require("bluebird");

var forEach = function() {
  var list = arguments[0]; // grab the collection
  for (var i = 0; i < list.length; i++) { // iterate over collection
    for (var j = 1; j < arguments.length; j++) { // iterate over callbacks arguments[1] .. arguments[n]

      arguments[j](list[i], i, list);
    }
  }
};

module.exports = {

  // Method to retrieve profile information and relevant education & experience milestones, and skills
  getProfile: function(request, response) {
    var resultProfile = {
      degrees: [],
      experiences: [],
      skills: []
    };

    var profileID = request.query.id;

    // Gets core profile details, using an inner join to get position, current company and industry names
    // Inserts results of query to resultProfile object

    var getProfileDetails = function(getProfileDetailsCB) {

      new Profile({'id': profileID}).fetch({
        withRelated: ['currentPosition', 'currentCompany', 'industry']
      })
      .then(function(profile) {

        var attributes  =   profile.attributes;
        var relations   =   profile.relations;

        if(attributes.picURL === null) {
          attributes.picURL = 'http://clipartist.net/RSS/openclipart.org/2012/June/monkey_face_cartoon-999px.png';
        }

        resultProfile.id                =     attributes.id;
        resultProfile.name              =     attributes.profile_name;
        resultProfile.linkedin          =     attributes.profileURL;
        resultProfile.pic               =     attributes.picURL;
        resultProfile.location          =     attributes.currentLocation;
        resultProfile.headline          =     attributes.headline;
        resultProfile.currentCompany    =     relations.currentCompany.attributes.company_name;
        resultProfile.currentPosition   =     relations.currentPosition.attributes.position_name;
        resultProfile.industry          =     relations.industry.attributes.industry_name;

      })
      .then(function() {
        getProfileDetailsCB();
      });
    };

    // Gets all relevant degrees for profile
    var getEducation = function(getEducationCB) {
      db.knex.from('eduMilestones')
        .innerJoin('degrees', 'eduMilestones.degree_id', 'degrees.id')
        .innerJoin('schools', 'eduMilestones.school_id', 'schools.id')
        .innerJoin('fieldsOfStudy', 'eduMilestones.fieldOfStudy_id', 'fieldsOfStudy.id')
        .where({
          profile_id: profileID
        })
        .then(function(degrees) {
          // console.log('degrees from getProfile', degrees);
          for (var i = 0; i < degrees.length; i++) {

            var degree = degrees[i];

            var milestone = {
              degree:     degree.degree_name,
              fos:        degree.fieldOfStudy_name,
              school:     degree.school_name,
              start:      degree.startYear,
              end:        degree.endYear
            };
            resultProfile.degrees.push(milestone);
          }
        })
        .then(function() {
          getEducationCB();
        });
    };

    // Gets all relevant work experience for profile
    var getExperience = function(getExperienceCB) {
      db.knex.from('expMilestones')
        .innerJoin('companies', 'expMilestones.company_id', 'companies.id')
        .innerJoin('positions', 'expMilestones.position_id', 'positions.id')
        .where({
          profile_id: profileID
        })
        .then(function(experiences) {
          for (var i = 0; i < experiences.length; i++) {

            var experience = experiences[i];

            var milestone = {
              company:    experience.company_name,
              position:   experience.position_name,
              start:      experience.start_date,
              end:        experience.end_date,
              positionID: experience.position_id
            };
            resultProfile.experiences.push(milestone);
          }
        })
        .then(function() {
          getExperienceCB();
        });
    };

    var getSkills = function(getSkillsCB) {
      db.knex.from('profiles_skills')
        .innerJoin('skills', 'profiles_skills.skill_id', 'skills.id')
        .where('profiles_skills.profile_id', profileID)
        .then(function(skills) {
          for (var i = 0; i < skills.length; i++) {
          var skill = skills[i];
            resultProfile.skills.push(skill.skill_name);
          }
        })
        .then(function() {
          getSkillsCB();
        });
    };

    var getProfileDetailsAsync    =   Promise.promisify(getProfileDetails);
    var getEducationAsync         =   Promise.promisify(getEducation);
    var getExperienceAsync        =   Promise.promisify(getExperience);
    var getSkillsAsync            =   Promise.promisify(getSkills);

    getProfileDetailsAsync()
    .then(function() {
      return getEducationAsync();
    })
    .then(function() {
      return getExperienceAsync();
    })
    .then(function() {
      return getSkillsAsync();
    })
    .then(function() {
      // console.log('Returning profile of: ' + resultProfile.name + '. Profile ID: ' + resultProfile.id);
      response.json(resultProfile);
    })
  },

  getProfilesFromIndustry: function(request, response){

    var industryName = request.query.industryName;

    db.knex
    .select('profiles.id', 'headline', 'profile_name', 'picURL')
    .from('industries')
    .innerJoin('profiles', 'industries.id', 'profiles.industry_id')
    .where({
       industry_name: industryName
    })
    .then(function(data){
      response.json(data)
    });
  }

};
