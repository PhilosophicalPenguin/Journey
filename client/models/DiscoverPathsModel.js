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

    this.set('info', response);

    clientRouter.viewJourney(this);
    //clientRouter.viewProfile(1);

    return response;
  },

});

