window.DiscoverPathsModel = Backbone.Model.extend({

	url: '/api/queryPositions/getStats',

	defaults : {
		position_name: '',
		position_image: ''
	},

	initialize: function() {

	},

	goToJourney: function(journeyClicked){

		this.fetch({data: $.param({name: journeyClicked})});

  },

  parse: function(response) {
  	console.log('got to parse from discoverPathsModel');

    this.set('info', response);

    clientRouter.viewJourney(this);

    return response;
  },

});

