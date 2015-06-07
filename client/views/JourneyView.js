window.JourneyView = Backbone.View.extend({
  el:"#mainContent",
	model: PositionModel,
	className: 'JourneyView',

  initialize: function () {


    var context = this;
    this.model.on('createThumbnails', function(){
      context.drawThumbnails(arguments);
    });


    this.render();
  },

  render: function () {


    this.$el.children().detach();

    new NavBarView();
    new AutocompleteView ({model: app});

    this.$el.append('<div class="container journeyView"><div class="row"><div class="col-md-8 innerJourney"></div></div></div>');
    this.$el.find('.innerJourney').append('<div class="sectionTitles"><h2>Destination:</h2><h1>' + this.model.get('position_name') + '</h1></div>');
    this.$el.find('.innerJourney').append('<div id="educationDiv"></div>');
    var newEducationView = new EducationView({model : this.model });
    this.$el.find('.innerJourney').append('<div id="experienceDiv"></div>');
    var newExperienceView = new ExperienceView({model : this.model });
    this.$el.find('.innerJourney').append('<div id="skillsDiv"></div>');
    var newSkillsView = new SkillsView({model: this.model});
    this.$el.find('.row').append(
      '<div class="col-md-4 rightCol">' + 
        '<div class="sectionTitles">' + 
          '<h2 class="hideCol">'+ this.model.get('position_name') + 's with</h2>' +
          '<h1 class="featuredHeader">Featured ' + this.model.get('position_name') + 's</h1>' +
        '</div>' +
        '<div class="profilesColumn"></div>' +
      '</div>'
    );

    var featuredPeople = [this.model.get('info').positions[this.model.get('position_name')]];
    this.drawThumbnails(featuredPeople);

   // this.$el.append(['<th>For the position</th>' + this.model.get('position_name')]);
  },

  drawThumbnails: function(peopleToDraw){

    var newThumbnailsCollection = new ThumbnailsCollection(peopleToDraw[0]);
    var newThumbnailsCollectionView = new ThumbnailsCollectionView({collection: newThumbnailsCollection});

    this.$el.find('.profilesColumn').append(newThumbnailsCollectionView.el);
    this.$el.find('.rightCol h1').text(this.model.get('positionFilter'));

    this.$el.find('.rightCol h2').removeClass('hideCol');
    this.$el.find('.rightCol h1').removeClass('featuredHeader');

  }

});
