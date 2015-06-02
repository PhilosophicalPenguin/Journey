window.ClientRouter = Backbone.Router.extend ({

 	routes: {
 		'' : 'home',
 		'viewJourney': 'viewJourney'
 	},

 	home: function () {
 		// var appView = new AppView();
 		// $(".mainContent").html(appView.el);

 	},

 	viewJourney: function(model) {

 		console.log('got to viewJourney on clientRouter');

		var journeyView = new JourneyView({model: model});
    $(".mainContent").html(journeyView.el);

 	}
});

var clientRouter = new ClientRouter();
Backbone.history.start();
