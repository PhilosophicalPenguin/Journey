var JourneyView = Backbone.View.extend({

	model: PositionModel,

  // template: _.template('<h2>This is a journey</h2><p> TEST PARAGRAPH</p><h3>Here are some statistics</h3>'),

  template: _.template("<h2> This is a journey</h2> <p> <%= degrees.total %> </p> <h3> Here are some stats </h3>"),
  // template: _.template('<%= title %>')

  initialize: function () {
  		// console.dir(this.model);
  		// console.log('OPTIONS', options);
  		// console.log('OPTIONS BUTT TOTAL', options.butt.total);

  		console.log("NEW JOURNEY VIEW CREATED, model degrees:", this.model.get("degrees"))

      this.render();
  },

  render: function () {
  		// console.log(options.model)
      this.$el.html(this.template(this.model.attributes));
  }
});

