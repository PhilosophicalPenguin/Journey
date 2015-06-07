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

    this.$el.append('<div class="container journeyView"><div class="row"><div class="col-md-12 innerJourney"></div></div></div>');
    this.$el.find('.innerJourney').append('<div class="sectionTitles"><h2>Destination:</h2><h1>' + this.model.get('position_name') + '</h1></div>');
    this.$el.find('.innerJourney').append('<div id="educationDiv"></div>');
    var newEducationView = new EducationView({model : this.model });
    this.$el.find('.innerJourney').append('<div id="experienceDiv"></div>');
    var newExperienceView = new ExperienceView({model : this.model });
    this.$el.find('.innerJourney').append('<div id="skillsDiv"></div>');
    var newSkillsView = new SkillsView({model: this.model});
    // this.$el.find('.row').append('<div class="col-md-4"><div class="sectionTitles"><h2>Software Engineers with</h2><h1>MA Computer Science degrees</h1></div></div>');



   // this.$el.append(['<th>For the position</th>' + this.model.get('position_name')]);
  },

  drawThumbnails: function(peopleToDraw){

    console.log("drawThumbnails being called!!! arguments:", arguments);
    console.log("drawThumbnails in JourneyView called with these people to draw: ", peopleToDraw);


    /*TESTS CREATION AND RENDERING OF ONE THUMBNAIL:*/
    // var testPerson = peopleToDraw[0][1];

    // console.log("testPerson", testPerson);

    // var newThumbnailModelTest = new ThumbnailModel(testPerson);

    // console.log("newThumbnailModelTest", newThumbnailModelTest);

    // var newThumbnailViewTest = new ThumbnailView({model: newThumbnailModelTest});
    // this.$el.append(newThumbnailViewTest.el);

    console.log("PEOPLE TO DRAW[0]: ", peopleToDraw[0]);

    var newThumbnailsCollectionTest = new ThumbnailsCollection(peopleToDraw[0]);

    newThumbnailsCollectionTest.each(function(thumbnail){
      console.log("thumbnail insance of thumbnail model?:", (thumbnail instanceof ThumbnailModel) );
    });

    var newThumbnailsCollectionView = new ThumbnailsCollectionView({collection: newThumbnailsCollectionTest});

    this.$el.append(newThumbnailsCollectionView.el);


  }

});
