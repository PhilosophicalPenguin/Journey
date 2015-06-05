var Position  =   require('../../db_Schemas/models/position');
var Profile   =   require('../../db_Schemas/models/profile');
var db        =   require('../../db_Schemas/config');
var Promise   =   require("bluebird");

var forEach = function() {
  var list = arguments[0]; // grab the collection
  for (var i = 0; i < list.length; i++) { // iterate over collection
    for (var j = 1; j < arguments.length; j++) { // iterate over callbacks arguments[1] .. arguments[n]

      arguments[j](list[i], i, list);
    }
  }
};

module.exports = {
  
  // Method to retrieve profile information and relevant education & experience milestones, and skills
  getProfile: function(request, response) {
    var resultProfile = {};

    var profileID = request.query.id;

    var getProfileDetails = function(getProfileDetailsCB) {
      db.knex.from('profiles')
        .innerJoin('positions', 'profiles.currentPosition_id', 'positions.id')
        .innerJoin('industries', 'profiles.industry_id', 'industries.id')
        .innerJoin('companies', 'profiles.currentCompany_id', 'companies.id')
        .where('profiles.id', profileID)
        .then(function(profile) {
          console.log('profile!!!', profile);

          resultProfile = {
            id:         profile[0].id,
            name:       profile[0].profile_name,
            linkedin:   profile[0].profileURL,
            pic:        profile[0].picURL,
            location:   profile[0].currentLocation,
            currentCompany:   profile[0].company_name,
            currentPosition:  profile[0].position_name,
            industry:   profile[0].industry_name,
            headline:   profile[0].headline
          }
        })
        .then(function(){
          console.log("GETPROFILEDETAILSCB ABOUT TO BE CALLED")
          getProfileDetailsCB();
        });
    }

    var getProfileDetailsAsync = Promise.promisify(getProfileDetails);
    
    getProfileDetailsAsync()
    .then(function(){
      console.log('profile returned', resultProfile);
      response.json(resultProfile);    
    })
  }
}


// profile.increments('id').primary();
//       profile.string('profileURL', 200).unique();
//       profile.string('profile_name', 100);
//       profile.string('picURL', 200).defaultTo('null');
//       profile.string('currentLocation', 100);
//       profile.string('headline', 200);
//       profile.integer('currentPosition_id');
//       profile.integer('currentCompany_id');
//       profile.integer('industry_id');