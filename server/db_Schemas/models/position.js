var db = require('../config');
var Profile = require('./profile');
var addMochData = require('../../addMochData');
var Promise = require("bluebird");
var _ = require('underscore');

// Defines individual position
var Position = db.Model.extend({
  tableName: 'positions',
  hasTimestamps: true,
  profiles: function() {
    return this.hasMany('Profile', 'position_id');
  },

  findOrCreate : function(options) {
    var cloned = this;
    console.log('THIS within findOrCreate', this);
    console.log('options within findOrCreate', options);
    
    return this.fetch({position_name: this.attributes.position_name, require: true})
    .then(null, function(err) {
      if (err) return cloned.save();
      else return;
      // console.log('CLONED!!!', cloned);
      // return cloned.save();
    });
  }

});

if(addMochData) {
  new Position ({
    position_name: "Software engineer",
  }).save().then(function(resp){
    console.log('New Position created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Position ({
    position_name: "Nurse practitioner",
  }).save().then(function(resp){
    console.log('New Position created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Position ({
    position_name: "Deputy attorney general",
  }).save().then(function(resp){
    console.log('New Position created!');
  }).catch(function(err) {
      console.error(err);
  });

  new Position ({
    position_name: "Product manager",
  }).save().then(function(resp){
    console.log('New Position created!');
  }).catch(function(err) {
      console.error(err);
  });
}

module.exports = db.model('Position', Position);