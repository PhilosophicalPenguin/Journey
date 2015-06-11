var SimilarPositionsView = Backbone.View.extend({
	
	tagName: "ul",
	className:"similarPositions",

	initialize: function(){

		// console.log("similar positions view initialized! model looks like: ", this.model);

		this.render();
	},

	render: function(){

		var experiences = this.model.get("experiences");
		var previousPositions = [];

		for(var i = 0; i < experiences.length; i++){

			previousPositions.push([this.model.get("experiences")[i].position, this.model.get("experiences")[i].positionID]);
		}

		previousPositions = _.uniq(previousPositions, false, function(position){
			return JSON.stringify(position)
		})

		// console.log("previousPositions", previousPositions);

		this.$el.append("<h2> Similar Positions </h2>")


		return this.$el.append(previousPositions.map(function(position){
			return ('<a href="' + "viewJourney/#" + position[1] + '"> <li class=similarposition>' +  position[0] + '</li> </a>')
		}))

	}








})