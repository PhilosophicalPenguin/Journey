var  positionQueryController = require('./positionQueryController')

module.exports = function (router) { 

    //                      VVV request-handler       
  router.get('/getStats', positionQueryController.getStatsOnPosition);

  console.log('routes');
};
