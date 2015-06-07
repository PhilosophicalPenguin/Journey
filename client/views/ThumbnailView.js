window.ThumbnailView = Backbone.View.extend({

    tagName: "li",
    model: ThumbnailModel,
    className: 'thumbnail',

    initialize: function() {

    	console.log("thumbnailview initialized");

        this.render();
    },

    events: {
    	'click': 'sendToProfile'
    },

        render: function() {

        console.log("thumbnailview render function called");

        console.log("this.model", this.model);
        console.log("this.model.name", this.model.name);
        var name = this.model.get('name');
        var id = this.model.get('id');
        var picURL = this.model.get('picURL');
        var headline = this.model.get('headline');


        //append DOM elements to the $el property

        return this.$el.append('<img src="' + picURL + '">' + '<div class="profileInfo">' + '<h1>' + name + '</h1>' + '<h2>' + headline + '</h2>' + '</div>');


        //return the el property (no $)



    },

    sendToProfile: function(){

    	console.log("sendToProfile called");
    	console.log("this.id", this.id);
    	clientRouter.navigate("profile/" + this.model.get('id')  , true );

    }




});
