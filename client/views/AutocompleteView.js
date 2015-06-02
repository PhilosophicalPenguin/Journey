// var AutocompleteView = require ('backbone-autocomplete');

var PositionSearchBoxView = AutocompleteView.extend({

	initialize: function() {
		this.render();
	},

	onSelect: function(model) {
		console.log(model);
	},

	searchMethod: function(model) {
		var label = model.get(this.searchField).toLowerCase();
		var searchValue = this.searchValue.toLowerCase().trim();

		if (label.indexOf(searchValue) !== -1) {
			return true;
		} else {
			return false;
		}
	}
});

