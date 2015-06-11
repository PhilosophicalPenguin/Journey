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

    console.log('in the journey heres the model', this.model);

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
        '<div class="sectionTitles featuredHeader">' + 
          '<h2 class="hideCol">'+ this.model.get('position_name') + 's with</h2>' +
          '<h1 class="">Featured ' + this.model.get('position_name') + 's</h1>' +
        '</div>' +
        '<div class="profilesColumn"></div>' +
      '</div>'
    );

    var featuredPeople = [this.model.get('positions')[this.model.get('position_name')]];
    for(var g= 0 ; g < featuredPeople[0].length; ++g) {
      console.log(featuredPeople[0][g].name);
    }
    this.drawThumbnails(featuredPeople);
    this.$el.find('.featuredHeader').addClass('offsetSectionTitles');
    this.$el.find('.featuredHeader h1').addClass('offsetHeader');
    this.$el.find('.featuredHeader h2').addClass('hideCol');
  },

  drawThumbnails: function(peopleToDraw){


    console.log("PEOPLE TO DRAW PASSED IN TO NEW THUMBNAILS COLLECTION in JourneyView.js: ", peopleToDraw[0]);
    var newThumbnailsCollection = new ThumbnailsCollection(peopleToDraw[0]);
    var newThumbnailsCollectionView = new ThumbnailsCollectionView({collection: newThumbnailsCollection});

    this.$el.find('.profilesColumn').append(newThumbnailsCollectionView.el);
    this.$el.find('.featuredHeader h1').text(this.model.get('positionFilter'));

    this.$el.find('.featuredHeader').removeClass('offsetSectionTitles');
    this.$el.find('.featuredHeader h1').removeClass('offsetHeader');
    this.$el.find('.featuredHeader h2').removeClass('hideCol');

  }

});
