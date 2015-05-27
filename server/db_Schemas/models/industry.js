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

new Industry ({
  industry_name: 'Consumer Electronics',
}).save().then(function(resp){
  console.log('New Industry created:', resp);
}).catch(function(err) {
    console.error(err);
});

new Industry ({
  industry_name: "Internet",
}).save().then(function(resp){
  console.log('New Industry created:', resp);
}).catch(function(err) {
    console.error(err);
});

new Industry ({
  industry_name: "Financial Services",
}).save().then(function(resp){
  console.log('New Industry created:', resp);
}).catch(function(err) {
    console.error(err);
});

new Industry ({
  industry_name: "Higher Education",
}).save().then(function(resp){
  console.log('New Industry created:', resp);
}).catch(function(err) {
    console.error(err);
});

module.exports = db.model('Industry', Industry);