var ClientRouter = Backbone.Router.extend ({

 	routes: {
 		'' : 'home',
 		'viewDegrees': 'viewDegrees'
 	},

 	home: function () {
 		// var appView = new AppView();
 		// $(".mainContent").html(appView.el);

 	},

 	viewDegrees: function(degrees) {

		var degreeView = new JourneyView(degrees);
    $(".mainContent").html(degreeView.el);

 	}
});

var clientRouter = new ClientRouter();
Backbone.history.start();
