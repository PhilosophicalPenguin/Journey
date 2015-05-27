var db = require('../config');
var EduMilestone = require('./eduMilestone');

// Defines an indvidual School record
var School = db.Model.extend({
  tableName: 'schools',
  hasTimestamps: true,
  eduMilestone: function() {
    return this.hasMany('EduMilestone', 'school_id');
  }
});

new School ({
  school_name: "UCLA",
}).save().then(function(resp){
  console.log('New School created:', resp);
}).catch(function(err) {
    console.error(err);
});

new School ({
  school_name: "Stanford",
}).save().then(function(resp){
  console.log('New School created:', resp);
}).catch(function(err) {
    console.error(err);
});

new School ({
  school_name: "UC Berkeley",
}).save().then(function(resp){
  console.log('New School created:', resp);
}).catch(function(err) {
    console.error(err);
});

new School ({
  school_name: "Hack Reactor",
}).save().then(function(resp){
  console.log('New School created:', resp);
}).catch(function(err) {
    console.error(err);
});

module.exports = db.model('School', School);