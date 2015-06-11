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
        console.log('go back called!');
        window.history.back();
      },

    render : function() {

        // console.log("Profile View modlel", this.model);

        this.$el.children().detach();
        this.$el.append(new NavBarView().render());
        this.$el.append('<div id="profile-card"></div>');
        this.$el.append('<div class="backButton">Back</div>');
        new ProfileCardView( { model : this.model } );
        this.$el.append('<div id="timeline-div"></div>');
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

            console.log("people passed in to new thumbnails collection view in ProfileView.js", people)

            var similarPeopleThumbnailCollection = new ThumbnailsCollection(people);
            var similarPeopleThumbnailsCollectionView = new ThumbnailsCollectionView({collection: similarPeopleThumbnailCollection});
            context.$el.append(similarPeopleThumbnailsCollectionView.el);
        });


        // console.log("newSimilarPeopleModel.get similar people", newSimilarPeopleModel.get('similarPeople'));
        // var newSimilarPeopleView = new SimilarPeopleView({model: newSimilarPeopleModel});

        // this.$el.find("#similarprofiles-div").append(newSimilarPeopleView.el);


    }
});

