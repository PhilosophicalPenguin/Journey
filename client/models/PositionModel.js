var PositionModel = Backbone.Model.extend({

	url: '/getStats',

	goToJourney: function(journeyClicked){

		this.fetch({data: $.param({name: journeyClicked})});

  },

	parse: function(response) {

    console.log('RESPONSE', response);

    var degreesObj = response.degrees;
    var fieldsOfStudyObj = response.fieldsOfStudy;

    console.log('degrees', degreesObj);
    console.log('FOS', fieldsOfStudyObj);

    clientRouter.viewDegrees(degreesObj);

    return response;
  },

});


