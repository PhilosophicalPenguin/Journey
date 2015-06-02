var DiscoverPathsView = Backbone.View.extend({

	tagName: 'table',
	template: _.template('<tr><td><%=position_name%></td><td><img src= <%=position_image%>></td></tr>'),

	initialize: function() {
		this.render();
	},

	events: {
		'click': 'journeyClickHandler'
	},

	render: function(){

		var context = this;

  	return this.collection.each(function(position){
  		context.$el.append(context.template(position.attributes))
  	})
  },

  journeyClickHandler: function(e) {
  	var journeyClicked = $(e.target).text();
  	var journey = this.collection.where({position_name: journeyClicked });

    journey[0].goToJourney(journeyClicked);
  }

})
