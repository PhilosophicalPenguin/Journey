window.PositionModel = Backbone.Model.extend({

    url: '/api/queryPositions/getStats',

    goToJourney: function(journeyClicked) {

        this.fetch({
            data: $.param({
                name: journeyClicked
            })
        });

    },


    testFunction: function(){
        console.log("this is a test");
    },

    createNewThumbnails: function(thumbnailsToCreate) {
        console.log("createNewThumbnails being called in PositionModel with args:", thumbnailsToCreate);
        this.trigger('createThumbnails', thumbnailsToCreate);
    },

    parse: function(response) {

        this.set('degrees', response.degrees);
        this.set('fieldsOfStudy', response.fieldsOfStudy);
        this.set('degreesAndFields', response.degreesAndFields);
        this.set('info', response);

        clientRouter.viewJourney(this);

        // clientRouter.navigate("/viewJourney/" + 13  , true )

        return response;
    }

});
