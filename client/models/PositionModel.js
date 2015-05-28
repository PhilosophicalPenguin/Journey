var PositionModel = Backbone.Model.extend({

	url: '/getStats',

	defaults: {
		name: null,
		degrees: null,
		FOS: null
	},


	goToJourney: function(journeyClicked){

		this.fetch({data: $.param({name: journeyClicked})});

  },

	parse: function(response) {

    console.log('RESPONSE', response);
    console.log("THIS MODEL", this);

    var degreesObj = response.degrees;
    var fieldsOfStudyObj = response.fieldsOfStudy;

    this.set('degrees', degreesObj);
    this.set('FOS', fieldsOfStudyObj);

   	console.log('DEGREES', this.get('degrees'));


    clientRouter.viewJourney(this);

    return response;
  },

});


