var  profileController = require('./profileController')

module.exports = function (router) { 

    //                      VVV request-handler       
  router.get('/getProfile', profileController.getProfile);

};
