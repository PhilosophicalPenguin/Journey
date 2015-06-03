window.StatsTableView = Backbone.View.extend({

	model: PositionModel,
	tagName: 'table',
	className: 'table',

  template: _.template('<tr><td><%=item.percentage%> have a <%=item.name%> or higher, </td></tr>'),

  initialize: function (model, options) {
  	console.log('POSITION MODEL from statstableview', this.model);
  	this.settings = options;
  	console.log('options woo!', options);

    this.render();
  },

  render: function() {

  	//create percentage for specified field of info related to position
  	var fieldName = this.settings.field; // the field the view is to render
  	var fieldItems = [];//an array of tuples

  	var field = this.model.get(fieldName); // grab the object that correlates to the specified name
  	//create the tuples grabing their names and calculate the %
  	for(var key in field) {
  		if(key!== 'total') {
  			var item = {};
  			item.name = key;
  			item.percentage = ((field[key] / field.total)*100 + "%");
  			fieldItems.push(item);
  		}
  	}

		var context = this;
  	fieldItems.forEach(function(item){
  		return context.$el.append(context.template({item: item}));
  	});
  }

});
