window.AppModel = Backbone.Model.extend ({

	url: '/api/queryPositions/getPositions',

	parse: function(response) {
		this.set('data', response);

		//response is an array of objects
		return response;
	},

	initialize: function(params){
    console.log(this);

		var entertainmentLawyer = new DiscoverPathsModel ({
  		  position_name: 'Entertainment Lawyer',
  		  position_image: '../assets/entertainment-lawyer.jpg',

		});

		var productManager = new DiscoverPathsModel ({
  		  position_name: 'Product Manager',
  		  position_image: '../assets/product-manager.jpg'
		});

		var dataScientist = new DiscoverPathsModel ({
  		  position_name: 'Data Scientist',
  	    position_image: '../assets/data-scientist.jpg'
		});


		this.set('discoverPathsCollection', new Backbone.Collection([entertainmentLawyer, productManager, dataScientist], {model: DiscoverPathsModel}));

    var response = null;

		this.fetch().then(this.positionsReceived.bind(this));
    this.set('availablePositions', []);

  },

  positionsReceived: function() {
    this.set('positionsCollection', new PositionsCollection(this.get('data')));
    this.trigger('positionsReceived');
	},


});
