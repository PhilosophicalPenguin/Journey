// AppView.js - Defines a backbone view class for the whole
var AppView = Backbone.View.extend({

	initialize: function(params) {
		this.positionView = new PositionView({model: this.model.get('positionModel')});
		this.positionsCollectionView = new PositionsCollectionView({collection: this.model.get('positionsCollection')});
		this.listenTo(this.model, 'positionsReceived', function() { console.log('woo!') } );
		this.render();
	},

	render: function(){
		return this.$el.html([
			'<h3>Choose a destination</h3>',
			this.positionsCollectionView.$el
		]);
	}

})
