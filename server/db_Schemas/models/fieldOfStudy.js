var db = require('../config');
var EduMilestone = require('./eduMilestone');

// Defines an individual FieldOfStudy record
var FieldOfStudy = db.Model.extend({
  tableName: 'fieldsOfStudy',
  hasTimestamps: true,
  eduMilestone: function() {
    return this.hasMany('EduMilestone', 'eduMilestone_id');
  }
});

// new FieldOfStudy ({
//   name: "Computer Science",
// }).save().then(function(resp){
//   console.log('New FieldOfStudy created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

// new FieldOfStudy ({
//   name: "Electrical Engineering",
// }).save().then(function(resp){
//   console.log('New FieldOfStudy created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

// new FieldOfStudy({
//   name: "Philosophy",
// }).save().then(function(resp){
//   console.log('New FieldOfStudy created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

// new FieldOfStudy({
//   name: "Business",
// }).save().then(function(resp){
//   console.log('New FieldOfStudy created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });


module.exports = db.model('FieldOfStudy', FieldOfStudy);