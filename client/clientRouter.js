window.ClientRouter = Backbone.Router.extend ({

    routes: {
        '' : 'home',
        // 'viewJourney': 'viewJourney',
    'viewJourney/:id': 'viewJourney'
    },

    home: function () {
    console.log('in home view - called from router');
        // var appView = new AppView();
        // $(".mainContent").html(appView.el);
    },

    viewJourney: function(model) {
        console.log('got to viewJourney on clientRouter');

        // var path = location.pathname;
        //console.log('in viewJourney', id);
        $("#mainContent").empty();
         var journeyView = new JourneyView({ model: model});
        //$("#mainContent").html(journeyView.el);
    }
});

var clientRouter = new ClientRouter();
Backbone.history.start();
