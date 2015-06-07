window.ThumbnailsCollectionView = Backbone.View.extend({
	
	tagName: "ul",
	className:"profiles",
	model: ThumbnailsCollection,

	initialize: function(){
		this.render();
	},


	render: function(){

		var fullTitle = this.collection.at(1).get('headline');

		var indexToCut = (fullTitle.indexOf('at'))-1;
		var title = (fullTitle.slice(0, indexToCut));		


		// return this.$el.append('<p> HELLO THIS IS A TEST PARAGRAPH </p>');

		// this.$el.append('<ul class="profiles"> </ul>');

		return this.$el.append(this.collection.map(function(thumbnail){
				
				var thumbnailView = new ThumbnailView({model: thumbnail});
				return thumbnailView.el;


		}));




	}

});