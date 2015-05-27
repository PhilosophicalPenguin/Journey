var JourneyView = Backbone.View.extend({

	model: PositionModel,

  template: '<h2>This is a journey</h2><h3>Here are some statistics</h3>',

  initialize: function () {
  		console.dir(this.model);

      this.render();
  },
  render: function () {
      this.$el.html(this.template);
  }
});

