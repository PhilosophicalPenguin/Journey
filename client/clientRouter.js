var ClientRouter = Backbone.Router.extend({

    routes: {
        '': 'home',
        'journey/:id': 'viewJourney',
        'profile/:id': 'viewProfile'
        'filter/:toID/:fromID': 'viewPaths'
    },

    home: function() {
        // var appView = new AppView();
        // $(".mainContent").html(appView.el);
    },

    viewJourney: function(id) {
        console.log('The id the router is working with');
        var positionModel = new PositionModel(null, id);

        this.listenTo(positionModel, 'RecievedStats', function() {
            console.log('event heard in router',arguments);
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
            var profileView = new ProfileView( { model : profileModel } );
        });
    },

    viewPaths: function(toID, fromID) {
        var filtersCollection = new FiltersCollection(fromID, toID);

        this.listenTo(filtersCollection, 'RecievedData', function() {
          $('.innerJourneyContent').empty();
          var filtersCollectionView = new FiltersCollectionView({ collection: filtersCollection });
          $('.innerJourneyContent').append(filtersCollectionView.el);
        });
    }

});

var clientRouter = new ClientRouter();
Backbone.history.start();
