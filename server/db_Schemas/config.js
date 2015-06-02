/* FROM HEADCOUNT APP (will help differetiate between local DB and hosted DB): 
  var knex =  !process.env.DATABASE_URL ? require('./local_config.js') : require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
}); */

var dbConfig = {
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'journey',
    charset  : 'utf8'
  }
}

//var knex = require('knex')(dbConfig);

//          if we are not deployed    use our local information    else we use the enviroment variable
var knex = !process.env.DATABASE_URL ? require('knex')(dbConfig) : require('knex')({
  client: 'mysql',
  connection: process.env.DATABASE_URL
});

var db = require('bookshelf')(knex);
db.plugin('registry');

// Creates 'degrees' table
db.knex.schema.hasTable('degrees').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('degrees', function (degree) {
      degree.increments('id').primary();
      degree.string('degree_name', 50).unique();      
      degree.timestamps();
    }).then(function (table) {
      console.log('Degrees table created.');
    });
  }
});

// Creates 'fieldsOfStudy' table
db.knex.schema.hasTable('fieldsOfStudy').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('fieldsOfStudy', function (fieldOfStudy) {
      fieldOfStudy.increments('id').primary();
      fieldOfStudy.string('fieldOfStudy_name', 50).unique();
      fieldOfStudy.timestamps();
    }).then(function (table) {
      console.log('FieldsOfStudy table created.');
    });
  }
});

// Creates 'schools' table
db.knex.schema.hasTable('schools').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('schools', function (school) {
      school.increments('id').primary();
      school.string('school_name', 100).unique();
      school.timestamps();
    }).then(function (table) {
      console.log('Schools table created.');
    });
  }
});

// Creates 'idustries' table
db.knex.schema.hasTable('industries').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('industries', function (industry) {
      industry.increments('id').primary();
      industry.string('industry_name', 50).unique();
      industry.timestamps();
    }).then(function (table) {
      console.log('Industries table created.');
    });
  }
});

// Creates 'profiles' table
db.knex.schema.hasTable('profiles').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('profiles', function (profile) {
      profile.increments('id').primary();
      profile.string('profileURL', 200).unique();
      profile.string('profile_name', 100);
      profile.string('picURL', 200);
      profile.string('currentLocation', 100);
      profile.integer('position_id');
      profile.integer('industry_id');
      profile.timestamps();
    }).then(function (table) {
      console.log('Profiles table created.');
    });
  }
});

// Creates 'positions' table
db.knex.schema.hasTable('positions').then(function(exists) {
  if (!exists){
    return knex.schema.createTable('positions', function (position) {
      position.increments('id').primary();
      position.string('position_name', 100).unique();
      position.timestamps();
    }).then(function (table) {
      console.log('Positions table created.');
    });
  }
})

// Creates 'eduMilestones' table & this is the key join table
db.knex.schema.hasTable('eduMilestones').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('eduMilestones', function (eduMilestone) {
      eduMilestone.increments('id').primary();
      eduMilestone.integer('profile_id');
      eduMilestone.integer('degree_id');
      eduMilestone.integer('fieldOfStudy_id');
      eduMilestone.integer('school_id');
      eduMilestone.integer('startYear', 4);
      eduMilestone.integer('endYear', 4)
      eduMilestone.timestamps();
    }).then(function (table) {
      console.log('EduMilestones table created.');
    });
  }
});

module.exports = db;
