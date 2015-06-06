window.AutocompleteView = Backbone.View.extend({

  model: AppModel,
  el: '#autocomplete',
  tagName: 'input',

  initialize: function() {

    this.$el.autocomplete({
      source: this.model.get('availablePositions')
    });
  },

  events: {
    'keyup' : 'journeyClickHandler',
  },


  journeyClickHandler: function(e) {

    // checks if key  pressed is enter key
    var isEnterKey = (e.which === 13);

    // if it's the enter key
    if(isEnterKey) {

      e.preventDefault();

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
    return this.el;
  }

});
