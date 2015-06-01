var db = require('../config');
var Profile = require('./profile');

// Defines individual Company Model
var Company = db.Model.extend({
  tableName: 'companies',
  hasTimestamps: true,
  profiles: function() {
    return this.hasMany('Profile', 'currentCompany_id');
  }
});

module.exports = db.model('Company', Company);