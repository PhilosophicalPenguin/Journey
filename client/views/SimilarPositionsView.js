var SimilarPositionsView = Backbone.View.extend({
	
	tagName: "ul",
	className:"similarPositions",

	initialize: function(){

		this.render();
	},

	render: function(){

		var experiences = this.model.get("experiences");
		var previousPositions = [];

		for(var i = 0; i < experiences.length; i++){

			previousPositions.push([this.model.get("experiences")[i].position, this.model.get("experiences")[i].positionID]);
		}

		previousPositions = _.uniq(previousPositions, false, function(position){
			return JSON.stringify(position);
		});

		console.log("previousPositions", previousPositions);

		if(previousPositions.length > 0){ 
      $('#similarpositions-div').append('<div class="rightColHeading">Similar Positions</div>');
    }

		return this.$el.append(previousPositions.map(function(position){
			console.log('position number!', position[1]);
			return ('<li class=similarposition><a href="#journey/' + position[1] + '"> ' +  position[0] + '</a> </li>');
		}));

	}

});