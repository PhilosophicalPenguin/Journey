var AppModel = Backbone.Model.extend ({

	url: '/api/queryPositions/getPositions',

	parse: function(response) {
		this.set('data', response);
		//response is an array of objects
		return response;
	},

	initialize: function(params){
		var response = null;

		this.fetch().then(this.positionsReceived.bind(this));

	},

	positionsReceived: function() {
		this.set('positionsCollection', new PositionsCollection(this.get('data')));
		this.trigger('positionsReceived');
	}


})
