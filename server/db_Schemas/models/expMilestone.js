var db = require('../config');
var Profile = require('./profile.js');
var Company = require('./company.js');
var Position = require('./position.js');

var ExpMilestone = db.Model.extend({
  tableName: 'expMilestones',
  hasTimestamps: true,
  profile: function() {
    return this.belongsTo('Profile', 'profile_id');
  },
  company: function() {
    return this.hasOne('Company', 'company_id');
  },
  position: function() {
    return this.hasOne('Position', 'position_id');
  }
});


module.exports = db.model('ExpMilestone', ExpMilestone);