var db = require('../config');
var Profile = require('./profile');

// Defines individual position
var Position = db.Model.extend({
  tableName: 'positions',
  hasTimestamps: true,
  profiles: function() {
    return this.hasMany('Profile', 'position_id');
  }
});

// new Position ({
//   name: "Software engineer",
// }).save().then(function(resp){
//   console.log('New Position created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

// new Position ({
//   name: "Nurse practitioner",
// }).save().then(function(resp){
//   console.log('New Position created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

// new Position ({
//   name: "Deputy attorney general",
// }).save().then(function(resp){
//   console.log('New Position created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

// new Position ({
//   name: "Product manager",
// }).save().then(function(resp){
//   console.log('New Position created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

module.exports = db.model('Position', Position);