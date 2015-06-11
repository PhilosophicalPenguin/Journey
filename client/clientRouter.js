var ClientRouter = Backbone.Router.extend({

    routes: {
        '': 'home',
<<<<<<< HEAD
        'journey/:id': 'viewJourney',
        'profile/:id': 'viewProfile',
        'filter/:toID/:fromID': 'viewPaths'
=======
        'viewJourney': 'viewJourney',
        // 'viewJourney/:id': 'viewJourney'
        //'viewJourney/:id': 'viewJourney',
        'profile/:id': 'viewProfile',
        'about': 'about'
>>>>>>> first implementation of about us page
    },

    home: function() {

        // var appView = new AppView();
        // $(".mainContent").html(appView.el);
    },

<<<<<<< HEAD
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

    about: function() {
        console.log('got to about');
        $("#mainContent").empty();

        var aboutUsCollection = new AboutUsCollection(aboutUsData);
        var aboutUsCollectionView = new AboutUsCollectionView( { collection: aboutUsCollection } );

        console.log('aboutUsCollection', aboutUsCollection);
        console.log('aboutUsCollectionView', aboutUsCollectionView);
    }

});

window.clientRouter = new ClientRouter();
Backbone.history.start();
