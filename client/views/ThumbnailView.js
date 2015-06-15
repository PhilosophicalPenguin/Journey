window.ThumbnailView = Backbone.View.extend({

    tagName: "li",
    model: ThumbnailModel,
    className: 'profileThumb',

    initialize: function() {

        this.render();
    },

    events: {
    	'click': 'sendToProfile'
    },

        render: function() {

            // console.log("this.model in thumbnail", this.model);

        var name    = this.model.get('name') || this.model.get('profile_name');
        var id      = this.model.get('id');
        var picURL  = this.model.get('picURL');
        var headline =  this.model.get('headline') || "";

        //append DOM elements to the $el property

        return this.$el.append('<img src="' + picURL + '">' + '<div class="profileInfo">' + '<h1>' + name + '</h1>' + '<h2>' + headline + '</h2>' + '</div>');

        //return the el property (no $)
    },

    sendToProfile: function(){

    	clientRouter.navigate("profile/" + this.model.get('id')  , true );

    }

});
