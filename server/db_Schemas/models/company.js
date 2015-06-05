var db = require('../config');
var Profile = require('./profile');
var ExpMilestone = require('./expMilestone');

// Defines individual Company Model
var Company = db.Model.extend({
  tableName: 'companies',
  hasTimestamps: true,
  profiles: function() {
    return this.hasMany('Profile', 'currentCompany_id');
  },
  expMilestone: function() {
    return this.hasMany('ExpMilestone', 'company_id');
  }
});

module.exports = db.model('Company', Company);