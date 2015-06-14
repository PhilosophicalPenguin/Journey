var ClientRouter = Backbone.Router.extend({

    routes: {
        '': 'home',
        'journey/:id': 'viewJourney',
        'profile/:id': 'viewProfile',
        'filter/:toID/:fromID': 'viewPaths',
    },

    home: function() {
    },

    viewJourney: function(id) {
        var positionModel = new PositionModel(null, id);

        this.listenTo(positionModel, 'RecievedStats', function() {
            $("#mainContent").empty();
            var journeyView = new JourneyView({
                model: positionModel
            });
        });

        positionModel.retrieveStats();
    },

    viewProfile: function(id) {

        var profileModel = new ProfileModel(id);

        this.listenTo(profileModel, 'RecievedData', function() {
            $('#mainContent').empty();
            window.scrollTo(0, 0);
            var profileView = new ProfileView( { model : profileModel } );
        });
    },

    viewPaths: function(toID, fromID) {

        var positionModel = new PositionModel(null, toID);

        this.listenTo(positionModel, 'RecievedStats', function() {
            $("#mainContent").empty();
            var journeyView = new JourneyView({
                model: positionModel
            });

            var filtersCollection = new FiltersCollection(fromID, toID);

            this.listenTo(filtersCollection, 'RecievedData', function() {
              $('.innerJourneyContent').empty();
              window.scrollTo(0, 0);
              var filtersCollectionView = new FiltersCollectionView({ collection: filtersCollection });
              $('.innerJourneyContent').append(filtersCollectionView.el);
            });
        });

        positionModel.retrieveStats();
    }

});

window.clientRouter = new ClientRouter();
Backbone.history.start();
