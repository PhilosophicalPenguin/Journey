var AppModel = Backbone.Model.extend ({

	initialize: function(params){
		this.set('positionModel', new PositionModel());

		params.positionsCollection.on('goToJourney', function(){
			console.log('going to journey from app model!!!');
		})
	}

})
