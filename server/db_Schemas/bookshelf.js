var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'journey',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

knex.schema.hasTable('degrees').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('degrees', function (table) {
      table.increments();
      table.string('name');
      table.timestamps();
    })
  }
});

var Degree = bookshelf.Model.extend({
  tableName: 'degrees',
  eduMilestone: function() {
    return this.hasMany(EduMilestone);
  }
});

new Degree({
  name: "M.B.A.",
}).save().then(function(resp){
  console.log('new degree created', resp)
});

var FieldOfStudy = bookshelf.Model.extend({
  tableName: 'fieldsOfStudy',
  id: {type: 'increments', nullable: false, primary: true},
  name: {type: 'string', nullable: false, unique: true},
  eduMilestone: function() {
    return this.hasMany(EduMilestone);
  }
});

var School = bookshelf.Model.extend({
  tableName: 'schools',
  id: {type: 'increments', nullable: false, primary: true},
  name: {type: 'string', nullable: false, unique: true},
  eduMilestone: function() {
    return this.hasMany(EduMilestone);
  }
});

var Profile = bookshelf.Model.extend({
  tableName: 'profiles',
  id: {type: 'increments', nullable: false, primary: true},
  name: {type: 'string', nullable: false},
  profileURL: {type: 'string', nullable: true, unique: true},
  picURL: {type: 'string', nullable: true},
  eduMilestone: function() {
    return this.hasMany(EduMilestone);
  }
});

var EduMilestone = bookshelf.Model.extend({
  tableName: 'eduMilestones',
  id: {type: 'increments', nullable: false, primary: true},
  degree: function() {
    return this.hasOne(Degree);
  },
  fieldOfStudy: function() {
    return this.hasOne(FieldOfStudy);
  },
  school: function() {
    return this.hasOne(School);
  },
  profile: function() {
    return this.hasOne(Profile);
  },
  startYear: {type: 'integer', nullable: true},
  endYear: {type: 'integer', nullable: true}
});

module.exports = require('bookshelf')(knex);