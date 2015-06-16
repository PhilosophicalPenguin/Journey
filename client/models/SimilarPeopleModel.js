var SimilarPeopleModel = Backbone.Model.extend({

  url: 'api/profiles/getProfilesFromIndustry',

  initialize: function(industryname) {
    //fetch data from the server

    this.fetch({
      data: $.param({
        'industryName': industryname
      })
    });
  },

  parse: function(data) {

    function shuffle(array) {
      var currentIndex = array.length,
          temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    data = shuffle(data);

    this.set('similarPeople', data.slice(0, 20));
    this.trigger('similarPeopleReceived');
  }
});
