var  positionQueryController = require('./positionQueryController')

module.exports = function (router) {
  router.get('/getStats',     positionQueryController.getStatsOnPosition);
  router.get('/getPositions', positionQueryController.getAvailablePositions);
  router.get('/getFilter',    positionQueryController.getFilterOnPosition);
  router.get('/getNav',       positionQueryController.getNavFromPositions);
};
