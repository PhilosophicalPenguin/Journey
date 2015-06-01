var db = require('../config');
var EduMilestone = require('./eduMilestone');
var Position = require('./position');
var Industry = require('./industry');
var addMochData = require('../../addMochData');


// Defines an invidual Profile record
var Profile = db.Model.extend({
  tableName: 'profiles',
  hasTimestamps: true,
  currentPosition: function() {
    return this.hasOne('Position', 'currentPosition_id');
  },
  industry: function() {
    return this.hasOne('Industry', 'industry_id');
  },
  eduMilestone: function() {
    return this.hasMany('EduMilestone', 'profile_id');
  },
  expMilestone: function() {
    return this.hasMany('ExpMilestone', 'profile_id');
  }
});

if(addMochData) {
  new Profile ({
    profile_name: 'Kevin Olson',
    profileURL: 'https://www.linkedin.com/in/kevinolson',
    picURL: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/066/26d/3fc215b.jpg',
    currentLocation: 'San Francisco, California',
    position_id: 1,
    industry_id: 2
  }).save().then(function(resp){
    console.log('New Profile created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Profile ({
    profile_name: 'Kurt Hurtado',
    profileURL: 'https://www.linkedin.com/in/kurthurtado',
    picURL: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/4/000/164/2ae/06f514f.jpg',
    currentLocation: 'San Francisco Bay Area',
    position_id: 1,
    industry_id: 2
  }).save().then(function(resp){
    console.log('New Profile created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Profile ({
    profile_name: 'Lev Stesin',
    profileURL: 'https://www.linkedin.com/in/levstesin',
    picURL: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/2/000/272/045/115dac8.jpg',
    currentLocation: 'San Francisco Bay Area',
    position_id: 1,
    industry_id: 2
  }).save().then(function(resp){
    console.log('New Profile created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Profile ({
    profile_name: 'Navid Kamali',
    profileURL: 'https://www.linkedin.com/in/ionrails',
    picURL: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/7/000/28f/09e/034280f.jpg',
    currentLocation: 'San Francisco Bay Area',
    position_id: 2,
    industry_id: 2
  }).save().then(function(resp){
    console.log('New Profile created!');
  }).catch(function(err) {
      console.error(err);
  });
}

module.exports = db.model('Profile', Profile);