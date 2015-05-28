var PositionsCollection = Backbone.Collection.extend({

		model: PositionModel,

		url: '/getStats',
		initialize: function() {
			console.log('++++++++++++PROFILE ID', this.fetch({data: $.param({name: 'Software engineer'})}));
			console.log('++++++++regular fetch', this.fetch());
		}


})
