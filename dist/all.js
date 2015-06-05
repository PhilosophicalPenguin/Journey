window.PositionModel = Backbone.Model.extend({

	url: '/api/queryPositions/getStats',

	goToJourney: function(journeyClicked){

		this.fetch({data: $.param({name: journeyClicked})});

  },

	parse: function(response) {

    this.set('degrees', response.degrees);
    this.set('fieldsOfStudy', response.fieldsOfStudy);
    this.set('degreesAndFields', response.degreesAndFields);

    clientRouter.viewJourney(this);

    // clientRouter.navigate("/viewJourney/" + 13  , true )

    return response;
  }

});



var PositionsCollection = Backbone.Collection.extend({

		model: PositionModel,

		initialize: function() {

		}


});

window.DiscoverPathsModel = Backbone.Model.extend({

	url: '/api/queryPositions/getStats',

	defaults : {
		position_name: '',
		position_image: ''
	},

	initialize: function() {

	},

	goToJourney: function(journeyClicked){

		this.fetch({data: $.param({name: journeyClicked})});

  },

  parse: function(response) {
  	console.log('got to parse from discoverPathsModel');

    this.set('degrees', response.degrees);
    this.set('fieldsOfStudy', response.fieldsOfStudy);
    this.set('degreesAndFields', response.degreesAndFields);

    clientRouter.viewJourney(this);

    return response;
  },

});


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

  tellPositionModel: function(journeyClicked) {
    console.log('this from app model', this);
  }

});

window.DiscoverPathsView = Backbone.View.extend({

	tagName: 'div',
	className: 'col-md-4',
	template: _.template('<h3 class=onePath><%=position_name%></h3>'),

	initialize: function() {
		this.render();
	},

	events: {
		'click': 'journeyClickHandler'
	},


  journeyClickHandler: function(e) {
  	var journeyClicked = $(e.target).text();
  	console.log('this is the journeyClicked', journeyClicked);
  	var journey = this.collection.where({position_name: journeyClicked });

    journey[0].goToJourney(journeyClicked);
  },

	render: function(){

		var context = this;

  	return this.collection.each(function(position){
  		context.$el.append(context.template(position.attributes));
  	});
  },
});

window.PositionsCollectionView = Backbone.View.extend({

	tagName: 'ul',
	className: 'positionsList',

	initialize: function(){
		this.render();
	},

	render: function(){
		this.$el.children().detach();

		this.$el.append(
			this.collection.map(function(position){
				return new PositionView({ model: position }).render();
			})
		);
	}
});

window.PositionView = Backbone.View.extend({

	tagName: 'li',
	className: 'positionView',
	template: _.template('<%= position_name %>'),

	intialize: function() {
		this.render();
	},

	events: {
		'click': 'journeyClickHandler',
	},

	render: function() {
		return this.$el.html(this.template(this.model.attributes));
	},

	journeyClickHandler : function(event){
    var journey = this.model.get('position_name');
    this.model.goToJourney(journey);
	},


});

window.AutocompleteView = Backbone.View.extend({

  model: AppModel,
  el: '#autocomplete',
  tagName: 'input',

  initialize: function() {
    var availablePositions = [];

    this.listenTo(this.model, 'positionsReceived', function() {

      console.log('listening to positioned received in autocomplete view');

      for (var key in this.model.attributes) {
        if(this.model.attributes[key].position_name !== null && this.model.attributes[key].position_name !== undefined) {
          availablePositions.push(this.model.attributes[key].position_name);
        }
      }

      console.log(availablePositions);
      this.$el.autocomplete({
        source: availablePositions
      });


    });

    this.render();
  },

  events: {
<<<<<<< HEAD
    //
    //on submit
=======
    'keyup' : 'journeyClickHandler',
  },


  journeyClickHandler: function(e) {

    var isEnterKey = (e.which === 13);

    if(isEnterKey) {
      var journeyEntered = this.$el.val();
      var journey = this.model.get('positionsCollection').where({position_name: journeyEntered});
      console.log(journeyEntered);
      console.log(journey);

      journey[0].goToJourney(journeyEntered);

    }


    // this.model.goToJourney(journey);

>>>>>>> Completes autocomplete functionality - hitting enter renders journeyview on searched position name
  },

  render: function() {

    return $("#autocomplete").html(this.el);

  }

});

// AppView.js - Defines a backbone view class for the whole
window.AppView = Backbone.View.extend({

	initialize: function(params) {

		// this.searchPositionsBox = new PositionSearchBoxView({searchField: 'position_name', collection: this.model.get('positionsCollection')});

		// var context = this;
		// this.listenTo(this.model, 'positionsReceived', function() {
		// 	context.positionsCollectionView =
		// 							new PositionsCollectionView({collection: this.model.get('positionsCollection')});
		// 	context.render();
		// 	});

		// this.render();

		this.discoverPathsView = new DiscoverPathsView({collection: this.model.get('discoverPathsCollection')});
		this.autocompleteView = new AutocompleteView({model: this.model});

		this.render();


	},

	render: function(){

		// this.$el.children().detach();

		// if (this.positionsCollectionView) {
		// 	return this.$el.append([
		// 		'<h3>Choose a destination</h3>', this.positionsCollectionView.$el
		// 	]);
		// }
		// return this.$el.append([
		// 	'<h3>Choose a destination</h3>'
		// ]);

		// this.$el.children().detach();


		return this.$el.append(this.discoverPathsView.$el);


	}
});

window.StatsTableView = Backbone.View.extend({

	model: PositionModel,
	tagName: 'table',
	className: 'table',

  template: _.template('<tr><td><%=item.percentage%> have a <%=item.name%> or higher, </td></tr>'),

  initialize: function (model, options) {
  	this.settings = options;
    this.render();
  },

  render: function() {

  	//create percentage for specified field of info related to position
  	var fieldName = this.settings.field; // the field the view is to render
  	var fieldItems = [];//an array of tuples

  	var field = this.model.get(fieldName); // grab the object that correlates to the specified name
  	//create the tuples grabing their names and calculate the %
  	for(var key in field) {
  		if(key!== 'total') {
  			var item = {};
  			item.name = key;
  			item.percentage = ((field[key] / field.total)*100 + "%");
  			fieldItems.push(item);
  		}
  	}

		var context = this;
  	fieldItems.forEach(function(item){
  		return context.$el.append(context.template({item: item}));
  	});
  }

});

window.JourneyView = Backbone.View.extend({

	model: PositionModel,
	className: 'JourneyView',
  template: _.template('<tr><td><%=degree.percentage%> have a <%=degree.name%> or higher, </td></tr>'),

  // template: _.template("<h4> For the position <%= title %>: </h4><h3> Education </h3><ul><li><%= degrees['B.S.'] %> have a B.S. or higher, </li><li><%= degrees['M.B.A.'] %> have a M.B.A. or higher, </li><li><%= degrees['B.A.'] %> have a B.A. or higher </li></ul>"),
  initialize: function () {

    this.render();
  },

  render: function () {
    var statsTableView = new StatsTableView({model: this.model}, {field: 'degreesAndFields'} );

    this.$el.append(['<th>For the position</th>' + this.model.get('title'), statsTableView.$el]);



  }

});

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

        // var path = location.pathname;
        //console.log('in viewJourney', id);
         var journeyView = new JourneyView({model: model});
        $(".mainContent").html(journeyView.el);
    }
});

var clientRouter = new ClientRouter();
Backbone.history.start();
