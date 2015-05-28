var db = require('../config');
var EduMilestone = require('./eduMilestone');
var addMochData = require('../../addMochData');

// Defines individual degree
var Degree = db.Model.extend({
  tableName: 'degrees',
  hasTimestamps: true,
  eduMilestone: function() {
    return this.hasMany('EduMilestone', 'degree_id');
  }
});

if(addMochData) {
  new Degree ({
    degree_name: "B.A.",
  }).save().then(function(resp){
    console.log('New Degree created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Degree ({
    degree_name: "B.S.",
  }).save().then(function(resp){
    console.log('New Degree created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Degree ({
    degree_name: "M.A.",
  }).save().then(function(resp){
    console.log('New Degree created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Degree ({
    degree_name: "M.B.A.",
  }).save().then(function(resp){
    console.log('New Degree created!');
  }).catch(function(err) {
      console.error(err);
  });
}

module.exports = db.model('Degree', Degree);