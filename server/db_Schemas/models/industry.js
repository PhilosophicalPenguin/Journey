var db = require('../config');
var EduMilestone = require('./eduMilestone');

// Defines an indvidual Industry record
var Industry = db.Model.extend({
  tableName: 'industries',
  hasTimestamps: true,
  eduMilestone: function() {
    return this.hasMany('EduMilestone', 'industry_id');
  }
});


// new Industry ({
//   name: 'Consumer Electronics',
// }).save().then(function(resp){
//   console.log('New Industry created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

// new Industry ({
//   name: "Internet",
// }).save().then(function(resp){
//   console.log('New Industry created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

// new Industry ({
//   name: "Financial Services",
// }).save().then(function(resp){
//   console.log('New Industry created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

// new Industry ({
//   name: "Higher Education",
// }).save().then(function(resp){
//   console.log('New Industry created:', resp);
// }).catch(function(err) {
//     console.error(err);
// });

module.exports = db.model('Industry', Industry);