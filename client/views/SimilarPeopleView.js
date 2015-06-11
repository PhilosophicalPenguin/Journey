window.SimilarPeopleView = Backbone.View.extend({
	
	tagName: "div",
	className:"profiles",
	model: ThumbnailsCollection,

	initialize: function(){
		console.log("similar people view rendering");
		this.render();
	},


	render: function(){


		console.log("similar people view rendering");
		console.log("this.model in similar people", this.model);
		console.log("this.model.get similarPeople in similarpeopleview", this.model.get('similarPeople'));


		// return this.$el.append(this.model.get('similarPeople').map(function(person){
				
		// 		var thumbnailView = new ThumbnailView({model: person});
		// 		return thumbnailView.el;

		// }));

	}

});