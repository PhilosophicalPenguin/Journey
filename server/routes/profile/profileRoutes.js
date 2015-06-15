var  profileController = require('./profileController')

module.exports = function (router) { 

  router.get('/getProfile', profileController.getProfile);
  router.get('/getProfilesFromIndustry', profileController.getProfilesFromIndustry);
  router.get('/getSimilarPositions', profileController.getSimilarPositionsFromIndustry);

};
