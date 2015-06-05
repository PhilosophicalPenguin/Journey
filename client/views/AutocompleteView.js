window.AutocompleteView = Backbone.View.extend({

  model: AppModel,
  el: '#autocomplete',
  tagName: 'input',

  initialize: function() {
    var availablePositions = [];

    this.listenTo(this.model, 'positionsReceived', function() {

      console.log('listening to positioned received in autocomplete view');

      for (var key in this.model.attributes) {
        if(this.model.attributes[key].position_name !== null && this.model.attributes[key].position_name !== undefined) {
          availablePositions.push(this.model.attributes[key].position_name);
        }
      }

      console.log(availablePositions);
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

    var isEnterKey = (e.which === 13);

    if(isEnterKey) {
      var journeyEntered = this.$el.val();
      var journey = this.model.get('positionsCollection').where({position_name: journeyEntered});
      console.log(journeyEntered);
      console.log(journey);

      journey[0].goToJourney(journeyEntered);
    }
  },

  render: function() {
    return $("#autocomplete").html(this.el);
  }

});
