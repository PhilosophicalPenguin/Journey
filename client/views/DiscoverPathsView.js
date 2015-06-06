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
