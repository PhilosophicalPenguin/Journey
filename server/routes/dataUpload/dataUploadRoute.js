var fs = require("fs");
var util = require('util');
var db = require('../../db_Schemas/config.js');
var multiparty = require('multiparty');
var Degree = require('../../db_Schemas/models/degree');
var Skill = require('../../db_Schemas/models/skill');
var FieldOfStudy = require('../../db_Schemas/models/fieldOfStudy');
var School = require('../../db_Schemas/models/school');
var Position = require('../../db_Schemas/models/position');
var Company = require('../../db_Schemas/models/company');
var Profile = require('../../db_Schemas/models/profile');
var Industry = require('../../db_Schemas/models/industry');
var EduMilestone = require('../../db_Schemas/models/eduMilestone');
var labelToIdStorage = require('../../labelToIdStorage');
var Promise = require("bluebird");
var async = require("async");

/* TODO: 

2. Add eduMilestones
a) loop over profile's education
b) for each degree / fos / school - fetch or create 
c) construct obj with:
- profile_id
- degree_id
- fieldOfStudy_id
- school_id
- startYear
- endYear
d) create eduMilestone


3. Add expMilestones 
*/

//helper for injesting json
// saveNewEntryToDB = function(model, propertyName, label, tableName) {
//   new model({
//     propertyName: label
//   }).save().then(function (resp) {
//     labelToIdStorage(tableName, fieldValue, resp.attributes.id);
//     return 
//   })
// }

module.exports = {
  parseUploadedData: function(req, res) {
    
    var data_dump_profiles = JSON.parse(fs.readFileSync(req.files.jsondata.path, "utf8"));

    async.eachSeries(data_dump_profiles, function(person, callbackNext) {
      
      obj = {};
      var skills_ids = [];

      var getSkills = function(callback){
        async.eachSeries(person.skills, function(skillName, nextSkill) {

          Skill.forge ({
            'skill_name': skillName
          })
          .fetch()
          .then(function(skill){
            if (skill === null) {
              Skill.forge({
                'skill_name': skillName
              }).save()
              .then(function(skill) {
                return skills_ids.push(skill.attributes.id);
              });
            }
            else {
              return skills_ids.push(skill.attributes.id);
            }
          });
          nextSkill(); // Go to the next skill in the array
        });

        callback(false); // Done with the loop over the skills array
      };

      var getPositionID = function(callback) {
        var positionLabel = person.current_title[0];

        Position.forge({
          'position_name': positionLabel
        })
        .fetch()
        .then(function(position) {
          if (position === null) {
            Position.forge({
              'position_name': positionLabel
            }).save()
            .then(function(position) {
              obj.positionID = position.attributes.id;
              callback(false)
            });
          } 
          else {
            obj.positionID = position.attributes.id;
            callback(false)
          }
        });
      }

      var getIndustryID = function(callback) {
        var industryLabel = person.industry[0];
        Industry.forge({
          'industry_name': industryLabel
        })
        .fetch()
        .then(function(industry) {
          if (industry === null) {
            Industry.forge({
                'industry_name': industryLabel
            }).save()
            .then(function(industry) {
              obj.industryID = industry.attributes.id;
              callback(false)
            });
          } else {
            obj.industryID = industry.attributes.id;
            callback(false);
          }
        });
      };

      var getCompanyID = function(callback) {
        var companyLabel = person.current_company[0];

        Company.forge({
          'company_name': companyLabel
        })
        .fetch()
        .then(function(company) {
          if (company === null) {
            Company.forge({
              'company_name': companyLabel
            }).save()
            .then(function(company) {
              obj.companyID = company.attributes.id;
              callback(false)
            });
          } 
          else {
            obj.companyID = company.attributes.id;
            callback(false)
          }
        });
      }

      var createProfile = function(callback) {
        new Profile({
          profile_name: person.full_name[0],
          profileURL: person.url,
          picURL: person.current_photo_link,
          headline: person.headline[0],
          currentLocation: person.location[0],
          currentPosition_id: obj.positionID,
          industry_id: obj.industryID,
          currentCompany_id: obj.companyID 
        }).save()
        .then(function(profile) {
          obj.profileID = profile.attributes.id;
          profile.skills().attach(skills_ids);
          callback(false);
        }).catch(function(err) {
          console.error(err);
        });
      };

      var createEduMilestones = function(callback){

        async.eachSeries(person.educationList, function(eduMilestone, nextMilestone) {

          var milestone = {
            profileID: obj.profileID,
            startYear: eduMilestone.start_date,
            endYear: eduMilestone.end_date
          };

          var getDegreeID = function(callback) {

            var degreeLabel = eduMilestone.degree;

            Degree.forge({
              'degree_name': degreeLabel
            })
            .fetch()
            .then(function(degree) {
              if (degree === null) {
                Degree.forge({
                  'degree_name': degreeLabel
                }).save()
                .then(function(degree) {
                  milestone.degreeID = degree.attributes.id;
                  callback(false)
                });
              } 
              else {
                milestone.degreeID = degree.attributes.id;
                callback(false)
              }
            });
          }

          var getFosID = function(callback) {

            var fosLabel = eduMilestone.major;

            FieldOfStudy.forge({
              'fieldOfStudy_name': fosLabel
            })
            .fetch()
            .then(function(fos) {
              if (fos === null) {
                FieldOfStudy.forge({
                  'fieldOfStudy_name': fosLabel
                }).save()
                .then(function(fos) {
                  milestone.fosID = fos.attributes.id;
                  callback(false)
                });
              } 
              else {
                milestone.fosID = fos.attributes.id;
                callback(false)
              }
            });
          };

          var getSchoolID = function(callback) {

            var schoolLabel = eduMilestone.school;

            School.forge({
              'school_name': schoolLabel
            })
            .fetch()
            .then(function(school) {
              if (school === null) {
                School.forge({
                  'school_name': schoolLabel
                }).save()
                .then(function(school) {
                  milestone.schoolID = school.attributes.id;
                  callback(false)
                });
              } 
              else {
                milestone.schoolID = school.attributes.id;
                callback(false)
              }
            });
          };

          var newEduMilestone = function(callback) {
            new EduMilestone({
              profile_id: milestone.profileID,
              degree_id: milestone.degreeID,
              fieldOfStudy_id: milestone.fosID,
              school_id: milestone.schoolID,
              startYear: milestone.startYear,
              endYear: milestone.endYear
            }).save()
            .then(function(eduMilestone) {
              console.log('New eduMilestone saved:', eduMilestone);
              callback(false);
            }).catch(function(err) {
              console.error(err);
            });
          };

          var getDegreeIDAsync      =   Promise.promisify(getDegreeID),
              getFosIDAsync         =   Promise.promisify(getFosID),
              getSchoolIDAsync      =   Promise.promisify(getSchoolID)
              newEduMilestoneAsync  =   Promise.promisify(newEduMilestone);

          getDegreeIDAsync().then(function(){
            return getFosIDAsync();
          }).then(function() {
            return getSchoolIDAsync();
          }).then(function() {
            return newEduMilestoneAsync();
          }).then(function() {
            console.log('newEduMilestone about to be saved!!!', milestone);
            nextMilestone(); // Go to the next eduMilestone in the array
          });

          callback(false); // Done with the loop over the education LIST array

        });
      };

      var getSkillsAsync            =   Promise.promisify(getSkills),
          getIndustryIDAsync        =   Promise.promisify(getIndustryID),
          getPositionIDAsync        =   Promise.promisify(getPositionID),
          getCompanyIDAsync         =   Promise.promisify(getCompanyID),
          createProfileAsync        =   Promise.promisify(createProfile),
          createEduMilestonesAsync  =   Promise.promisify(createEduMilestones);

      getSkillsAsync().then(function() {
        return getCompanyIDAsync();
      }).then(function() {
        return getIndustryIDAsync();
      }).then(function() {
        return getPositionIDAsync();
      }).then(function() {
        return createProfileAsync();
      }).then(function() {
        return createEduMilestonesAsync();
      }).then(function() {
        console.log('at end of everything, obj looks like:', obj)
        callbackNext(); // Go to next person
      })
    });


        // data_dump_profiles.forEach(function(person) {

        //   // async.eachSeries(data_dump_profiles, function(person, function(){


        //   // }))

        //     console.log("NEW PERSON'S PROFILE IS BEING SCRAPED")

        //     // LOOP OVER EACH PROFILE IN DATA DUMP

        //     // ADD PREVIOUS POSITION TITLES TO POSITIONS TABLE
        //     // for (var j = 0; j < person.past_experience_list.length; j++) {

        //     //   var positionLabel = person.past_experience_list[j].title;
        //     //   var positionID = labelToIdStorage.getId('positions', positionLabel);
        //     //   console.log('positionID!!!!!', positionID);

        //     //   if( positionID === -1) {
        //     //     new Position({
        //     //       position_name: person.past_experience_list[j].title,
        //     //     }).save().then(function(resp) {
        //     //       positionID = resp.attributes.id;
        //     //       labelToIdStorage.addItem('positions', positionLabel, positionID);
        //     //       console.log('response from labelToIdStorage', labelToIdStorage.positions);
        //     //     }).catch(function(err) {
        //     //       console.error(err);
        //     //     });
        //     //   }
        //     // }

        //     // ADD CURRENT_TITLE TO POSITIONS TABLE & GET POSITION ID
        //     // var getPositionID = function(callback) {

        //     //   var currentPositionLabel = JSON.stringify(person.current_title[0]);
        //     //   var obj = {
        //     //     currentPositionID: labelToIdStorage.getId('positions', currentPositionLabel)
        //     //   };

        //     //   if(obj.currentPositionID === -1) {
        //     //     new Position({
        //     //       position_name: currentPositionLabel
        //     //     }).save()
        //     //     .then(function(resp) {
        //     //       obj.currentPositionID = resp.attributes.id;
        //     //       labelToIdStorage.addItem('positions', currentPositionLabel, obj.currentPositionID);
        //     //       callback(false, obj);
        //     //     })
        //     //     .catch(function(err) {
        //     //       console.error(err);
        //     //     });
        //     //   }
        //     //   else {
        //     //     callback(false, obj);
        //     //   }
        //     // }

        //     // var getIndustryID = function(obj, callback) {
        //         obj = {};
        //     var industryLabel = person.industry[0];
        //     // var industryLabel = "Computer Software";

        //     Industry.forge({
        //             'industry_name': industryLabel
        //         })
        //         .fetch()
        //         .then(function(industry) {
        //             console.log('industry returned from getIndustryID, it\'s either null or ID#:', industry);
        //             if (industry === null) {
        //                 console.log('Its null');
        //                 Industry.forge({
        //                     'industry_name': industryLabel
        //                 }).save().then(function(industry) {
        //                   console.log('argumentssssss', Object.keys(arguments));
        //                     obj.industryID = industry.attributes.id;
        //                     console.log("we created a new industry ID:", obj.industryID)
        //                     // callback(false, obj);
        //                     return obj;
        //                 })
        //             } else {
        //                 console.log("we found a new industry id:", industry.attributes.id)
        //                 obj.industryID = industry.attributes.id;
        //                 console.log('object returned from getIndustryID', obj);
        //                 // callback(false, obj);
        //                 return obj

        //             }
        //         }).then(function(returnedObj){
        //           console.log('returnedObj', returnedObj)
        //         })
        // // }

        //     // var getIndustryIDAsync = Promise.promisify(getIndustryID);

        //     // getIndustryIDAsync()
        //     //     .then(function(obj) {
        //     //         console.log('got Industry ID from async function. here\'s the whole obj:', obj);
        //     //     });
        // })


    }
}




// INVOKE CHAIN OF EVENTS
// getPositionIDAsync()
// .then(function(obj){
//   console.log('got the Position id!!!!', obj);
//   return getIndustryIDAsync(obj);
// })
// .then(function(obj){
//   callback(false, function(){
//     console.log('Finished parsing one profile!!!', obj)
//   });
// });





// ITERATE OVER EDUCATION LIST
// for (var i = 0; i < person.educationList.length; i++) {

//     var degreeLabel = person.educationList[i].degree;
//     var degreeID = labelToIdStorage.getId('degrees', degreeLabel);

//     if( degreeID === -1) {
//         //ADD TO DEGREES TABLE IF NOT IN LOCAL HASH TABLE
//         new Degree({
//             degree_name: degreeLabel
//         }).save().then(function(resp) {
//             degreeID = resp.attributes.id;
//             labelToIdStorage.addItem('degrees', degreeLabel, degreeID)
//         }).catch(function(err) {
//             console.error(err);
//         });
//     }

//     var fieldOfStudyLabel = person.educationList[i].major;
//     var fieldOfStudyID = labelToIdStorage.getId('fieldsOfStudy', fieldOfStudyLabel);

//     if( fieldOfStudyID === -1) {
//       //ADD TO FIELDS OF STUDY TABLE IF NOT IN LOCAL HASH TABLE 
//       new FieldOfStudy({
//           fieldOfStudy_name: fieldOfStudyLabel
//       }).save().then(function(resp) {
//           fieldOfStudyID = resp.attributes.id;
//           labelToIdStorage.addItem('fieldsOfStudy', fieldOfStudyLabel, fieldOfStudyID);
//       }).catch(function(err) {
//           console.error(err);
//       });
//     }

//     var schoolLabel = person.educationList[i].school;
//     var schoolID = labelToIdStorage.getId('schools', schoolLabel);
//     if(schoolID === -1) {
//       //ADD TO SCHOOLS TABLE IF NOT IN LOCAL HASH TABLE 
//       new School({
//         school_name: schoolLabel
//       }).save().then(function (resp) {
//         schoolID = resp.attributes.id;
//         labelToIdStorage.addItem('school', schoolLabel, schoolID);
//       }).catch(function (err) {
//         console.error(err);
//       })
//     }
// }






// //ADD TO EDUMILESTONES
// for (var k = 0; k < person.educationList.length; k++) {

//  var person_profile_id;
//  var person_degree_id;
//  var person_fieldOfStudy_id;
//  var person_school_id;


//  new Profile({'name': person.full_name[0]})
//      .fetch()
//      .then(function(model){
//          console.log("EDUMILESTONES QUERIED, PERSON FOOOOUND; MODEL:", model)
//          person_profile_id = model.get('id');
//          console.log("person_profile_id", person_profile_id)
//      })


//  new Degree({'name': person.educationList[k].degree})
//      .fetch()
//      .then(function(model){
//          person_degree_id = model.get('id');
//          console.log("person_degree_id", person_degree_id)
//      })

//  new FieldOfStudy({'name': person.educationList[k].major})
//      .fetch()
//      .then(function(model){
//          person_fieldOfStudy_id = model.get('id');
//          console.log("person_fieldOfStudy_id", person_fieldOfStudy_id)
//      })

//  new School({'name': person.educationList[k].school})
//      .fetch()
//      .then(function(model){
//          person_school_id = model.get('id');
//          console.log("person_school_id", person_school_id)
//      })



//  new EduMilestone ({
//    profile_id: person_profile_id,
//    degree_id: person_degree_id,
//    fieldOfStudy_id: person_fieldOfStudy_id,
//    school_id: person_school_id,
//    startYear: person.educationList[k].start_date,
//    endYear: person.educationList[k].end_date
//  }).save().then(function(resp){
//    console.log('New EduMilestone created:', resp)
//  }).catch(function(err) {
//      console.error(err);
//  });






// EXAMPLE PROFILE:

// {
//     "current_title": ["Architect and Lead Backend Engineer"],
//     "current_photo_link": ["https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/3/000/074/21e/3783021.jpg"],
//     "headline": ["Software Architect | Senior Software Engineer"],
//     "industry": ["Information Technology and Services"],
//     "educationList": [{
//         "degree": "Bsc",
//         "school": "North South University",
//         "major": "Computer Science",
//         "end_date": "2007",
//         "start_date": "2003"
//     }],
//     "current_company": ["Revel Systems"],
//     "location": ["San Francisco Bay Area"],
//     "full_name": ["Mirza Asif"],
//     "url": "https://www.linkedin.com/in/mirzaaasif",
//     "skills": ["jQuery", "MySQL", "PHP", "JavaScript", "Ruby", "C#", "Software Engineering", "Web Services", "Python", "XML", "Software Project...", "PostgreSQL", "Git", "Java", "MongoDB", "Mobile Applications", "Flex", "Objective-C", "C++", "HTML 5", "Scrum", "Visual C++", "J2ME", "Oracle", "Ruby on Rails", "mongo", "Django", "Symbian C++", "J2EE", "Web Project Management", "Technical Leadership", "Thought Leadership", "HAML", "Machine Learning", "Application Development", "Perl", "ElasticSearch", "HTML5"],
//     "past_experience_list": [{
//         "duration": "1 year 1 month",
//         "company": "Ekhanei.com (formerly known as Cellbazaar)",
//         "start_date": "December 2012",
//         "end_date": "December 2013",
//         "title": "CTO"
//     }, {
//         "duration": "4 years 7 months",
//         "company": "IBT Games",
//         "start_date": "June 2008",
//         "end_date": "December 2012",
//         "title": "CTO"
//     }, {
//         "duration": "7 years 7 months",
//         "company": "Infrablue Technology",
//         "start_date": "June 2005",
//         "end_date": "December 2012",
//         "title": "CTO"
//     }, {
//         "duration": "1 year 4 months",
//         "company": "LegacyChamp",
//         "start_date": "March 2011",
//         "end_date": "June 2012",
//         "title": "Development Lead and Technology Consultant"
//     }, {
//         "duration": "1 year 4 months",
//         "company": "SocialBuy",
//         "start_date": "October 2009",
//         "end_date": "January 2011",
//         "title": "Development Lead and Technology Consultant"
//     }, {
//         "duration": "1 year 3 months",
//         "company": "GoSwoop",
//         "start_date": "January 2007",
//         "end_date": "March 2008",
//         "title": "Development Lead"
//     }, {
//         "duration": "1 year",
//         "company": "Sisu Technologies Limited",
//         "start_date": "2004",
//         "end_date": "2005",
//         "title": "Mobile Application Developer"
//}
