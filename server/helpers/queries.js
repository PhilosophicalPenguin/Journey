var db = require('../db_Schemas/config');

module.exports = {
  getExperienceStats : function(positionID, callback) {
    // create a join table to retrieve all experience info of
    // people and their history, who have or had the job specified
    db.knex.from('expMilestones')
      .innerJoin('profiles', 'expMilestones.profile_id', 'profiles.id')
      .innerJoin('companies', 'expMilestones.company_id', 'companies.id')
      .innerJoin('positions', 'expMilestones.position_id', 'positions.id')
      .where({
          currentPosition_id: positionID
      })
      .then(callback);
  },

  getEducationStats : function(positionID, callback) {
    //create a join table to retrieve all information of
    // people and their history, who have or had the job specified
    db.knex.from('eduMilestones')
    .innerJoin('profiles', 'eduMilestones.profile_id', 'profiles.id')
    .innerJoin('degrees', 'eduMilestones.degree_id', 'degrees.id')
    .innerJoin('schools', 'eduMilestones.school_id', 'schools.id')
    .innerJoin('fieldsOfStudy', 'eduMilestones.fieldOfStudy_id', 'fieldsOfStudy.id')
    .where({
      currentPosition_id: positionID
    })
    .then(callback);
  },

  getSkillStats : function(positionID, callback) {
    // create a join table to retrieve all skill stats
    db.knex.from('profiles_skills')
    .innerJoin('profiles', 'profiles_skills.profile_id', 'profiles.id')
    .innerJoin('skills', 'profiles_skills.skill_id', 'skills.id')
    .where({
        currentPosition_id: positionID
    })
    .then(callback);
  }
}