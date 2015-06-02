// AppView.js - Defines a backbone view class for the whole
var AppView = Backbone.View.extend({

	initialize: function(params) {

		// this.searchPositionsBox = new PositionSearchBoxView({searchField: 'position_name', collection: this.model.get('positionsCollection')});

		// var context = this;
		// this.listenTo(this.model, 'positionsReceived', function() {
		// 	context.positionsCollectionView =
		// 							new PositionsCollectionView({collection: this.model.get('positionsCollection')});
		// 	context.render();
		// 	});

		// this.render();

		this.render();


	},

	render: function(){

		// this.$el.children().detach();

		// if (this.positionsCollectionView) {
		// 	return this.$el.append([
		// 		'<h3>Choose a destination</h3>', this.positionsCollectionView.$el
		// 	]);
		// }
		// return this.$el.append([
		// 	'<h3>Choose a destination</h3>'
		// ]);

		// this.$el.children().detach();

		var discoverPathsView = new DiscoverPathsView({collection: this.model.get('discoverPathsCollection')});

		return this.$el.append(['hello', discoverPathsView.$el]);


	}
})
