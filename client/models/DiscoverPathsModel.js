var DiscoverPathsModel = Backbone.Model.extend({

	url: '/api/queryPositions/getStats',

	defaults : {
		position_name: '',
		position_image: ''
	},

	initialize: function() {

		console.log(this);
	},

	goToJourney: function(journeyClicked){
		console.log('got to goToJourney from discoverPathsModel');

		console.log(this.fetch({data: $.param({name: journeyClicked})}));

  },

  parse: function(response) {
  	console.log('got to parse from discoverPathsModel');

    this.set('degrees', response.degrees);
    this.set('fieldsOfStudy', response.fieldsOfStudy);
    this.set('degreesAndFields', response.degreesAndFields);

    clientRouter.viewJourney(this);

    return response;
  },

})
