var ClientRouter = Backbone.Router.extend ({

 	routes: {
 		'' : 'home',
 		'viewJourney': 'viewJourney'
 	},

 	home: function () {
 		// var appView = new AppView();
 		// $(".mainContent").html(appView.el);

 	},


 	viewJourney: function() {

		var journeyView = new JourneyView();
    $(".mainContent").html(journeyView.el);

 	}
});

var clientRouter = new ClientRouter();
Backbone.history.start();
