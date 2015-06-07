var db = require('../config');
var Profile = require('./profile');
var ExpMilestone = require('./expMilestone')
var addMochData = require('../../addMochData');

// Defines individual Position Model
var Position = db.Model.extend({
  tableName: 'positions',
  hasTimestamps: true,
  profiles: function() {
    return this.hasMany('Profile', 'currentPosition');
  },
  expMilestone: function() {
    return this.hasMany('ExpMilestone', 'position_id');
  }

});

if(addMochData) {
  new Position ({
    position_name: "Software engineer",
  }).save().then(function(resp){
    console.log('New Position created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Position ({
    position_name: "Nurse practitioner",
  }).save().then(function(resp){
    console.log('New Position created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Position ({
    position_name: "Deputy attorney general",
  }).save().then(function(resp){
    console.log('New Position created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Position ({
    position_name: "Product manager",
  }).save().then(function(resp){
    console.log('New Position created!');
  }).catch(function(err) {
      console.error(err);
  });
}

module.exports = db.model('Position', Position);