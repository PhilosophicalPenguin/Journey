var AppModel = Backbone.Model.extend ({

	url: '/api/queryPositions/getPositions',

	parse: function(response) {
		this.set('data', response);
		//response is an array of objects
		console.log('all available positions array', response);
		return response;
	},

	initialize: function(params){
		var response = null;

		this.fetch().then(this.positionsReceived.bind(this));
		this.set('positionModel', new PositionModel());

	},

	positionsReceived: function() {
		console.log(this);
		console.log('this.get data', this.get('data'));
		this.set('positionsCollection', new PositionsCollection(this.get('data')))
		this.trigger('positionsReceived');
	}


})
