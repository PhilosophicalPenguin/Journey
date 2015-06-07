var ThumbnailsCollection = Backbone.Collection.extend({
	
	model: ThumbnailModel,

	initialize: function(){

		console.log("new Thumbnails collection initialized.");
		console.log("this is what the thumbnails collection this looks like: ", this);

		// this.models.each(function(individualThumbnail){
		// 	console.log("individualThumbnail", individualThumbnail);
		// });

	console.log(this.at(0));
	
	}


});