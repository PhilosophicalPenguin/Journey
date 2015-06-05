window.ClientRouter = Backbone.Router.extend ({

    routes: {
        '' : 'home',
        'viewJourney': 'viewJourney',
        // 'viewJourney/:id': 'viewJourney'
        //'viewJourney/:id': 'viewJourney',
        'profile/:id': 'viewProfile'
    },

    home: function () {
    console.log('in home view - called from router');
        // var appView = new AppView();
        // $(".mainContent").html(appView.el);
    },

    viewJourney: function(model) {

        // var path = location.pathname;
        //console.log('in viewJourney', id);
        $("#mainContent").empty();
         var journeyView = new JourneyView({ model: model});
    },

    viewProfile : function(id) {
        console.log('hello woo!');
        var profileModel = new ProfileModel(id);
        $('#mainContent').empty();
        var profile = new ProfileView( { model : profileModel } );
    }
});

var clientRouter = new ClientRouter();
Backbone.history.start();
