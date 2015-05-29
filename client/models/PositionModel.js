var PositionModel = Backbone.Model.extend({

	url: '/getStats',

	defaults: {
		title: null,
		degrees: null,
		FOS: null
	},


	goToJourney: function(journeyClicked){

		console.log(this.fetch({data: $.param({name: journeyClicked})}));

  },

	parse: function(response) {

    console.log('RESPONSE', response);
    console.log("THIS MODEL", this);

    this.set('degrees', response.degrees);
    this.set('fieldsOfStudy', response.fieldsOfStudy);


    clientRouter.viewJourney(this);

    return response;
  },

});


