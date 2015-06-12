window.AutocompleteView = Backbone.View.extend({

  model: AppModel,
  el: '#autocomplete',
  tagName: 'input',

  initialize: function() {

    this.$el.autocomplete({
      source: this.model.get('availablePositions'),
    });

    // wait until positions received from the server
    this.listenTo(this.model, 'positionsReceived', function() {


      for (var key in this.model.attributes) {
        // put all the positions that are in the server into an array that will be used as the reference "source" for the autocomplete
        if(this.model.attributes[key].position_name !== null && this.model.attributes[key].position_name !== undefined) {
          this.model.get('availablePositions').push(this.model.attributes[key].position_name);
        }
      }
      // set the source for the autocomplete widget to available positions
      this.$el.autocomplete({
        source: this.model.get('availablePositions'),
      });
    });


    this.render();
  },

  events: {

    'keydown' : 'keyDownClickHandler',
    'autocompleteselect': function(event, ui) {
      this.journeySelected = ui.item.value;
    }
  },


  keyDownClickHandler: function(e) {

    // checks if key pressed is enter key
    var isEnterKey = (e.which === 13);

    // if it's the enter key
    if(isEnterKey) {
      e.preventDefault();
      // get the value of the input field
      var journeySelected = this.$el.val() || this.journeySelected;
      // grab the model from the positions collection where the position name matches with the entered position. This returns an array
      var journey = this.model.get('positionsCollection').where({position_name: journeySelected})[0];
      // call 'goToJourney', which lives on the position model, and pass in the journeyEntered
      journey.viewPosition();
      //clears input field after a search
      this.$el.val('');
    }
  },

  render: function() {

    // replace autocomplete field that already exists on the dom with this autocomplete
    return this.el;
  }

});
