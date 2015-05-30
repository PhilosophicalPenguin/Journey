var StatsTableView = Backbone.View.extend({

	model: PositionModel,
	tagName: 'table',
	className: 'StatsTableView',

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
  		return context.$el.append(context.template({item: item}))
  	});

  	//so the following code creates %s for all
  	//fields associated to the position
  // 	var data = {};
  // 	data.degrees = [];
  // 	data.schools = [];
  // 	data.fieldsOfStudy = [];
  // 	data.degreesAndFields = [];

  // 	var objConstructor = function(array, obj){
  //     for (var key in obj){		//BA, MBA, MS
  //       if(key != 'total'){
  //         var item = {};
  //         item.name = key;		//{name: BA}
  //         item.percentage = ((obj[key] / obj.total)*100 + "%");	//{name: BA, percentage: 55%}
  //         array.push(item);
  //       }
  //     }
  //   };

  //   objConstructor(data.degrees, this.model.get('degrees'));
  //   objConstructor(data.schools, this.model.get('schools'));
  //   objConstructor(data.fieldsOfStudy, this.model.get('fieldsOfStudy'));
  //   objConstructor(data.degreesAndFields, this.model.get('degreesAndFields'));



  // //   this.$el.html('<th>Education</th>').append(
  // //     data.degrees.map(function(degree){
  // //       return context.$el.html(context.template(data));
  // //     })
  // //   );

		// var context = this;

		// context.$el.append('<h4>'+ this.model.get('position_name') + '</h4>');

  // 	data.degreesAndFields.forEach(function(degreesAndFields){
  // 		return context.$el.append(context.template({degreesAndFields: degreesAndFields}))
  // 	});
  }

})
