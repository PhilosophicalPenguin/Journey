var ProfileView = Backbone.View.extend({
  el: '#mainContent',
  model: ProfileModel,

    initialize : function() {

        this.render();
    },


      events: {
        'click .backButton': 'goBack'
      },

      goBack: function() {
        window.history.back();
      },

    render : function() {

        // console.log("Profile View modlel", this.model);

        this.$el.children().detach();
        new NavBarView();
        new AutocompleteView ({model: app});
        
        $('#mainContent').append('<div class="container profileContainer"></div>');
        var $outerContainer = $('.profileContainer');
        
        $outerContainer.append('<div class="row"></div>');
        var $mainRow =  $('.row'); 
        
        $mainRow.append('<div class="col-md-8 leftCol">');
        $mainRow.append('<div class="col-md-4 rightCol">');
        var $leftCol = $('.leftCol');
        var $rightCol = $('.rightCol');

        $leftCol.append('<div id="profile-card"></div>');
        // $leftCol.append('<div class="backButton">Back</div>');
        new ProfileCardView( { model : this.model } );
        
        $leftCol.append('<div id="timeline-div"></div>');
        new TimelineView( { model : this.model } );

        
        this.$el.append('<div id="similarpositions-div"> </div>');
        var newSimilarPositionsView = new SimilarPositionsView({model: this.model});
        this.$el.find("#similarpositions-div").append(newSimilarPositionsView.el);

        this.$el.append('<div id="similarprofiles-div"> <h2> Similar Profiles: </div>');


        var context = this;
        var newSimilarPeopleModel = new SimilarPeopleModel(this.model.get('industry'));

        this.listenTo(newSimilarPeopleModel, 'similarPeopleReceived', function() {
            var people = newSimilarPeopleModel.get('similarPeople');

            people.forEach(function(person){
                if(person.picURL === null){
                    person.picURL = 'http://bridgesprep.org/wp-content/uploads/2013/10/Facebook-no-profile-picture-icon-620x389.jpg'
                }
                if(person.headline === null){
                    person.headline = '';
                }
            })

            var similarPeopleThumbnailCollection = new ThumbnailsCollection(people);
            var similarPeopleThumbnailsCollectionView = new ThumbnailsCollectionView({collection: similarPeopleThumbnailCollection});
            context.$el.append(similarPeopleThumbnailsCollectionView.el);
        });


        // console.log("newSimilarPeopleModel.get similar people", newSimilarPeopleModel.get('similarPeople'));
        // var newSimilarPeopleView = new SimilarPeopleView({model: newSimilarPeopleModel});

        // this.$el.find("#similarprofiles-div").append(newSimilarPeopleView.el);


    }
});

