var db = require('../config');
var EduMilestone = require('./eduMilestone');

// Defines individual degree
var Degree = db.Model.extend({
  tableName: 'degrees',
  hasTimestamps: true,
  eduMilestone: function() {
    return this.hasMany('EduMilestone', 'degree_id');
  }
});

// new Degree ({
//   name: "B.A.",
// }).save().then(function(resp){
//   console.log('New Degree created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

// new Degree ({
//   name: "B.S.",
// }).save().then(function(resp){
//   console.log('New Degree created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

// new Degree ({
//   name: "M.A.",
// }).save().then(function(resp){
//   console.log('New Degree created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

// new Degree ({
//   name: "M.B.A.",
// }).save().then(function(resp){
//   console.log('New Degree created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

module.exports = db.model('Degree', Degree);