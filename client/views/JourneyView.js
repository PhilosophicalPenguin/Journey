window.JourneyView = Backbone.View.extend({
  el:"#mainContent",
	model: PositionModel,
	className: 'JourneyView',

  initialize: function () {
    console.log('this model from journeyview', this.model);
    this.render();
  },

  render: function () {
    this.$el.children().detach();

    new NavBarView();
    new AutocompleteView ({model: app});


    this.$el.append('<div class="container journeyView"><div class="row"><div class="col-md-12 innerJourney"></div></div></div>');
    this.$el.find('.innerJourney').append('<div class="sectionTitles"><h2>Destination:</h2><h1>' + this.model.get('position_name') + '</h1></div>');
    this.$el.find('.innerJourney').append('<div id="educationDiv"></div>');
    var newEducationView = new EducationView({model : this.model });
    this.$el.find('.innerJourney').append('<div id="experienceDiv"></div>');
    var newExperienceView = new ExperienceView({model : this.model });
    this.$el.find('.innerJourney').append('<div id="skillsDiv"></div>');
    var newSkillsView = new SkillsView({model: this.model});
    // this.$el.find('.row').append('<div class="col-md-4"><div class="sectionTitles"><h2>Software Engineers with</h2><h1>MA Computer Science degrees</h1></div></div>');

  }

});
