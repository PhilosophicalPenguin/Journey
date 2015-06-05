window.PositionModel = Backbone.Model.extend({

	url: '/api/queryPositions/getStats',

	goToJourney: function(journeyClicked){
    console.log("parameter being passed", journeyClicked);
		this.fetch({data: $.param({name: journeyClicked})});

  },

	parse: function(response) {
    this.set('info', response);
    this.set('degrees', response.degrees);
    this.set('fieldsOfStudy', response.fieldsOfStudy);
    this.set('degreesAndFields', response.degreesAndFields);

    clientRouter.viewJourney(this);

    // clientRouter.navigate("/viewJourney/" + 13  , true )

    return response;
  }

});


