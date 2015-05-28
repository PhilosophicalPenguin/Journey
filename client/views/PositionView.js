var PositionView = Backbone.View.extend({

	tagName: 'li',
	className: 'positionView',
	template: _.template('<%= title %>'),

	events: {
		'click': 'journeyClickHandler',
	},

	render: function() {
		// return this.$el.html(this.model.get('title'));
		return this.$el.html(this.template(this.model.attributes));
	},

	journeyClickHandler : function(event){
    var journey = this.model.get('title');
    alert(journey);
    this.model.goToJourney(journey);

	},

	// goToJourneyPage: function() {
	// 	this.model.goToJourney();
	// }

})



