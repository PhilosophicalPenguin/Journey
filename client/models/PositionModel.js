var PositionModel = Backbone.Model.extend({

	goToJourney: function(){
		// Triggering an event here will also trigger the event on the collection
		clientRouter.viewJourney();
  },


});


