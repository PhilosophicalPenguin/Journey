var db = require('../config');
var Profile = require('./profile');
var addMochData = require('../../addMochData');

// Defines an individual Skill record
var Skill = db.Model.extend({
  tableName: 'skills',
  profiles: function(){
    return this.belongsToMany(Profile);
  },
  hasTimestamps: true
});

if(addMochData) {
  new Skill ({
    skill_name: "JavaScript",
  }).save().then(function(resp){
    console.log('New Skill created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Skill ({
    skill_name: "Marketing",
  }).save().then(function(resp){
    console.log('New Skill created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Skill ({
    skill_name: "Node.JS",
  }).save().then(function(resp){
    console.log('New Skill created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Skill ({
    skill_name: "Social media marketing",
  }).save().then(function(resp){
    console.log('New Skill created!');
  }).catch(function(err) {
      console.error(err);
  });

};

module.exports = db.model('Skill', Skill);