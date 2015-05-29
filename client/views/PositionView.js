var PositionView = Backbone.View.extend({

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
		// return this.$el.html(this.model.get('title'));
		return this.$el.html(this.template(this.model.attributes));
	},

	journeyClickHandler : function(event){
    var journey = this.model.get('position_name');
    alert(journey);
    this.model.goToJourney(journey);

	},


})



