window.AutocompleteView = Backbone.View.extend({

  model: AppModel,
  el: '#autocomplete',
  tagName: 'input',

  initialize: function() {
    var availablePositions = [];

    // wait until positions received from the server
    this.listenTo(this.model, 'positionsReceived', function() {

      console.log('listening to positioned received in autocomplete view');

      for (var key in this.model.attributes) {
        // put all the positions that are in the server into an array that will be used as the reference "source" for the autocomplete
        if(this.model.attributes[key].position_name !== null && this.model.attributes[key].position_name !== undefined) {
          availablePositions.push(this.model.attributes[key].position_name);
        }
      }
      // set the source for the autocomplete widget to available positions
      this.$el.autocomplete({
        source: availablePositions
      });
    });

    this.render();
  },

  events: {
    'keyup' : 'journeyClickHandler',
  },


  journeyClickHandler: function(e) {

    // checks if key pressed is enter key
    var isEnterKey = (e.which === 13);

    // if it's the enter key
    if(isEnterKey) {
      // get the value of the input field
      var journeyEntered = this.$el.val();
      // grab the model from the positions collection where the position name matches with the entered position. This returns an array
      var journey = this.model.get('positionsCollection').where({position_name: journeyEntered});
      // call 'goToJourney', which lives on the position model, and pass in the journeyEntered
      journey[0].goToJourney(journeyEntered);
      //clears input field after a search
      this.$el.val('');
    }
  },

  render: function() {
    // replace autocomplete field that already exists on the dom with this autocomplete
    return $("#autocomplete").html(this.el);
  }

});
