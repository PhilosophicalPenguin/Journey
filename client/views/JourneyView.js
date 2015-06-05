window.JourneyView = Backbone.View.extend({
  el:"#mainContent",
	model: PositionModel,
	className: 'JourneyView',

  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.children().detach();
    this.$el.append('<header class="navbar navbar-static-top" role="navigation"><div class="container"><div class="navbar-header"><a href="#/"><h1>Journey</h1></a></div></div></header>');
    this.$el.append('<div class="container journeyView"><div class="row"><div class="col-md-12 innerJourney"></div></div></div>');
    this.$el.find('.innerJourney').append('<div class="sectionTitles"><h2>Destination:</h2><h1>' + this.model.get('position_name') + '</h1></div>');
    this.$el.find('.innerJourney').append('<div id="experienceDiv"></div>');
    var newExperienceView = new ExperienceView({model : this.model });
    this.$el.find('.innerJourney').append('<div id="educationDiv"></div>');
    var newEducationView = new EducationView({model : this.model });
    this.$el.find('.innerJourney').append('<div id="skillsDiv"></div>');
    var newSkillsView = new SkillsView({model: this.model});


   // this.$el.append(['<th>For the position</th>' + this.model.get('position_name')]);
  }

});
