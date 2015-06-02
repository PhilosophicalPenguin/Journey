window.AppModel = Backbone.Model.extend ({

	url: '/api/queryPositions/getPositions',

	parse: function(response) {
		this.set('data', response);
		//response is an array of objects
		return response;
	},

	initialize: function(params){

		var lawyer = new DiscoverPathsModel ({
  		position_name: 'Corporate Lawyer',
  		position_image: '../assets/lawyer.jpg',

		});

		var softwareEngineer = new DiscoverPathsModel ({
  		position_name: 'Software Engineer',
  		position_image: '../assets/software_engineer.jpg'
		});

		var nurse = new DiscoverPathsModel ({
  		position_name: 'Nurse Practioner',
  		position_image: '../assets/nurse.jpg'
		});


		this.set('discoverPathsCollection', new Backbone.Collection([lawyer, softwareEngineer, nurse], {model: DiscoverPathsModel}));

		var response = null;

		this.fetch().then(this.positionsReceived.bind(this));

	},

	positionsReceived: function() {
		this.set('positionsCollection', new PositionsCollection(this.get('data')));
		this.trigger('positionsReceived');
	},

})
