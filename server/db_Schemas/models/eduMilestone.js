var db = require('../config');
var Profile = require('./profile.js');
var Degree = require('./degree.js');
var FieldOfStudy = require('./fieldOfStudy.js');
var School = require('./school.js');
var addMochData = require('../../addMochData');


var EduMilestone = db.Model.extend({
  tableName: 'eduMilestones',
  hasTimestamps: true,
  profile: function() {
    return this.belongsTo('Profile', 'profile_id');
  },
  degree: function() {
    return this.hasOne('Degree', 'degree_id');
  },
  fieldOfStudy: function() {
    return this.hasOne('FieldOfStudy', 'fieldOfStudy_id');
  },
  school: function() {
    return this.hasOne('School', 'school_id');
  }
});


if(addMochData) {
  new EduMilestone ({
    profile_id: 1,
    degree_id: 2,
    fieldOfStudy_id: 1,
    school_id: 2,
    startYear: 1999,
    endYear: 2003
  }).save().then(function(resp){
    console.log('New EduMilestone created!');
  }).catch(function(err) {
      console.error(err);
  });

  new EduMilestone ({
    profile_id: 1,
    degree_id: 4,
    fieldOfStudy_id: 4,
    school_id: 3,
    startYear: 2007,
    endYear: 2009
  }).save().then(function(resp){
    console.log('New EduMilestone created!');
  }).catch(function(err) {
      console.error(err);
  });

  new EduMilestone ({
    profile_id: 2,
    degree_id: 2,
    fieldOfStudy_id: 1,
    school_id: 3,
    startYear: 2005,
    endYear: 2009
  }).save().then(function(resp){
    console.log('New EduMilestone created!');
  }).catch(function(err) {
      console.error(err);
  });

  new EduMilestone ({
    profile_id: 3,
    degree_id: 1,
    fieldOfStudy_id: 3,
    school_id: 4,
    startYear: 1995,
    endYear: 1999
  }).save().then(function(resp){
    console.log('New EduMilestone created!');
  }).catch(function(err) {
      console.error(err);
  });

  new EduMilestone ({
    profile_id: 4,
    degree_id: 2,
    fieldOfStudy_id: 2,
    school_id: 1,
    startYear: 2004,
    endYear: 2008
  }).save().then(function(resp){
    console.log('New EduMilestone created!');
  }).catch(function(err) {
      console.error(err);
  });

  new EduMilestone ({
    degree_id: 3,
    fieldOfStudy_id: 2,
    school_id: 2,
    startYear: 2013,
    endYear: 2015
  }).save().then(function(resp){
    console.log('New EduMilestone created!');
  }).catch(function(err) {
      console.error(err);
  });

  new EduMilestone({'id': '2'}).fetch({
    withRelated: ['profile']
  }).then(function(EduMilestone) {
    // console.log(EduMilestone.related('profile').toJSON());
    // console.log(EduMilestone.related('degree').toJSON());
    console.log(EduMilestone.toJSON());
  });
}



module.exports = db.model('EduMilestone', EduMilestone);