window.ClientRouter = Backbone.Router.extend({

    routes: {
        '': 'home',
        'viewJourney': 'viewJourney',
        // 'viewJourney/:id': 'viewJourney'
        //'viewJourney/:id': 'viewJourney',
        'profile/:id': 'viewProfile'
    },

    home: function() {

        // var appView = new AppView();
        // $(".mainContent").html(appView.el);
    },

    viewJourney: function(model) {

        // var path = location.pathname;
        //console.log('in viewJourney', id);
        $("#mainContent").empty();


        var journeyView = new JourneyView({
            model: model
        });
    },

    viewProfile : function(id) {
        var profileModel = new ProfileModel(id);

        this.listenTo(profileModel, 'RecievedData', function() {
            $('#mainContent').empty();
            var profileView = new ProfileView( { model : profileModel } );
        });
    }
});

var clientRouter = new ClientRouter();
Backbone.history.start();
