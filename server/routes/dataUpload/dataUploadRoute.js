var fs = require("fs");
var util = require('util');
var db = require('../../db_Schemas/config.js');
var multiparty = require('multiparty');
var Degree = require('../../db_Schemas/models/degree');
var FieldOfStudy = require('../../db_Schemas/models/fieldOfStudy');
var School = require('../../db_Schemas/models/school');
var Position = require('../../db_Schemas/models/position');
var Profile = require('../../db_Schemas/models/profile');
var Industry = require('../../db_Schemas/models/industry');
var EduMilestone = require('../../db_Schemas/models/eduMilestone');
var labelToIdStorage = require('../../labelToIdStorage');

//TODO: position ids and industry ids are not being passed in correctly!
//

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

        var data_dump_profiles = JSON.parse(fs.readFileSync(req.files.jsondata.path, "utf8"))

        var degreeID = null;

        data_dump_profiles.forEach(function(person) {

            //ADD PREVIOUS POSITION TITLES TO POSITIONS TABLE
            for (var j = 0; j < person.past_experience_list.length; j++) {

                var positionLabel = person.past_experience_list[j].title;
                var positionID = labelToIdStorage.getId('positions', positionLabel);

                if( positionID === -1) {
                    new Position({
                        position_name: person.past_experience_list[j].title,
                    }).save().then(function(resp) {
                      positionID = resp.attributes.id;
                      labelToIdStorage.addItem('positions', positionLabel, positionID)
                      console.log('response from labelToIdStorage', labelToIdStorage.positions);
                    }).catch(function(err) {
                        console.error(err);
                    });
                }
            }

            //ADD CURRENT_TITLE TO POSITIONS 

            var currentPositionLabel = person.current_title[0];
            var currentPositionID = labelToIdStorage.getId('positions', currentPositionLabel);

            if(currentPositionID === -1) {
              new Position({
                  position_name: person.current_title[0],
              }).save().then(function(resp) {
                currentPositionID = resp.attributes.id;
                labelToIdStorage.addItem('positions', positionLabel, positionID)
                console.log('response from labelToIdStorage', labelToIdStorage.positions);
              }).catch(function(err) {
                  console.error(err);
              });
            }

            var industryLabel = person.industry[0];
            var industryID = labelToIdStorage.getId('industries', industryLabel);

            // ADD TO INDUSTRIES TABLE
            if(industryID === -1) {
              new Industry({
                  industry_name: person.industry[0],
              }).save().then(function(resp) {
                industryID = resp.attributes.id;
                labelToIdStorage.addItem('induestries', industryLabel, industryID)
                console.log('response from labelToIdStorage', labelToIdStorage.industries);
              }).catch(function(err) {
                  console.error(err);
              });
            }


            console.log("PERSON.URL[0]:::::::::::::", person.url[0])
            console.log('currentPositionID', currentPositionID);
            console.log('industryID', industryID);

            new Profile ({
              profile_name: person.full_name[0],
              profileURL: person.url,
              picURL: person.current_photo_link,
              currentLocation: person.location[0],
              position_id: currentPositionID,
              industry_id: industryID
            }).save().then(function(resp){
              console.log('New Profile created:', resp);
            }).catch(function(err) {
                console.error(err);
            });

            // ITERATE OVER EDUCATION LIST
            for (var i = 0; i < person.educationList.length; i++) {
                console.log("person.educationList[i]", person.educationList[i])

                var degreeLabel = person.educationList[i].degree;
                var degreeID = labelToIdStorage.getId('degrees', degreeLabel);

                if( degreeID === -1) {
                    //ADD TO DEGREES TABLE IF NOT IN LOCAL HASH TABLE
                    new Degree({
                        degree_name: degreeLabel
                    }).save().then(function(resp) {
                        degreeID = resp.attributes.id;
                        labelToIdStorage.addItem('degrees', degreeLabel, degreeID)
                        console.log('response from labelToIdStorage', labelToIdStorage.degrees);
                    }).catch(function(err) {
                        console.error(err);
                    });
                }

                var fieldOfStudyLabel = person.educationList[i].major;
                var fieldOfStudyID = labelToIdStorage.getId('fieldsOfStudy', fieldOfStudyLabel);

                if( fieldOfStudyID === -1) {
                  //ADD TO FIELDS OF STUDY TABLE IF NOT IN LOCAL HASH TABLE 
                  new FieldOfStudy({
                      fieldOfStudy_name: fieldOfStudyLabel
                  }).save().then(function(resp) {
                      fieldOfStudyID = resp.attributes.id;
                      labelToIdStorage.addItem('fieldsOfStudy', fieldOfStudyLabel, fieldOfStudyID);
                      console.log('response from labelToIdStorage', labelToIdStorage.fieldsOfStudy);
                  }).catch(function(err) {
                      console.error(err);
                  });
                }

                var schoolLabel = person.educationList[i].school;
                var schoolID = labelToIdStorage.getId('schools', schoolLabel);
                if(schoolID === -1) {
                  //ADD TO SCHOOLS TABLE IF NOT IN LOCAL HASH TABLE 
                  new School({
                    school_name: schoolLabel
                  }).save().then(function (resp) {
                    schoolID = resp.attributes.id;
                    labelToIdStorage.addItem('school', schoolLabel, schoolID);
                  }).catch(function (err) {
                    console.error(err);
                  })
                }
            }


           
           


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



            // }







        })



    }
}


//ONE PROFILE:

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
//     }
