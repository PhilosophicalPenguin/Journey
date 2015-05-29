var AppModel = Backbone.Model.extend ({

	url: '/api/queryPositions/getPositions',

	parse: function(response) {
		this.set('data', response);
		console.log('all available positions', response);
		return response;
	},

	initialize: function(params){
		var response = null;
		var context = this;
		this.fetch().then(function(res) {
			context.trigger('positionsReceived');
		});


		this.set('positionModel', new PositionModel());

	}


})
