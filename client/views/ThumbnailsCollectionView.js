window.ThumbnailsCollectionView = Backbone.View.extend({
	
	tagName: "ul",
	className:"profiles",
	model: ThumbnailsCollection,

	initialize: function(){
		this.render();
	},


	render: function(){


		$('.profilesColumn').children().detach();

		return this.$el.append(this.collection.map(function(thumbnail){
				
				var thumbnailView = new ThumbnailView({model: thumbnail});
				return thumbnailView.el;

		}));

	}

});