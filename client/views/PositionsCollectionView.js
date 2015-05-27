var PositionsCollectionView = Backbone.View.extend({

	tagName: 'ul',
	className: 'positionsList',

	initialize: function(){
		// this.collection.on('goToJourneyClicked', console.log('goToJourneyClicked'));
		this.render();

	},

	render: function(){
		this.$el.children().detach();
		this.$el.html('<li class="positionsHeader">Positions</li>')
		.append(
			this.collection.map(function(position){
				return new PositionView({ model: position }).render();
			})
		)
	}
})
