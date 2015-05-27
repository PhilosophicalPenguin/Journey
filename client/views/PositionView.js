var PositionView = Backbone.View.extend({

	tagName: 'li',
	className: 'positionView',
	template: _.template('<%= title %>'),

	events: {
		'click': 'goToJourneyPage',
	},

	render: function() {
		// return this.$el.html(this.model.get('title'));
		return this.$el.html(this.template(this.model.attributes));
	},

	goToJourneyPage: function() {
		this.model.goToJourney();
	}

})



