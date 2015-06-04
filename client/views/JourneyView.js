window.JourneyView = Backbone.View.extend({
  el:"#mainContent",
	model: PositionModel,
	className: 'JourneyView',

  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.children().detach();
    this.$el.append('<h1>People who currently have the title ' + this.model.get('position_name') + ' have the following histories:</h1>');
    this.$el.append('<div id="experienceDiv"></div>');
    var newExperienceView = new ExperienceView({model : this.model });
    this.$el.append('<div id="educationDiv"></div>');
    var newEducationView = new EducationView({model : this.model });
    this.$el.append('<div id="skillsDiv"></div>');
    var newSkillsView = new SkillsView({model: this.model});


   // this.$el.append(['<th>For the position</th>' + this.model.get('position_name')]);
  }

});
