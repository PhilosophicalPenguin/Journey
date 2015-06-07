window.PositionModel = Backbone.Model.extend({

    url: '/api/queryPositions/getStats',

    goToJourney: function(journeyClicked) {

        this.fetch({
            data: $.param({
                name: journeyClicked
            })
        });

    },

    createNewThumbnails: function(thumbnailsToCreate) {
        this.trigger('createThumbnails', thumbnailsToCreate);
    },

    parse: function(response) {

        this.set('degrees', response.degrees);
        this.set('fieldsOfStudy', response.fieldsOfStudy);
        this.set('degreesAndFields', response.degreesAndFields);
        this.set('info', response);

        clientRouter.viewJourney(this);

        return response;
    }

});
