var StatsTableView = Backbone.View.extend({

	model: PositionModel,
	tagName: 'table',
	className: 'StatsTableView',

  template: _.template('<tr><td><%=degreesAndFields.percentage%> have a <%=degreesAndFields.name%> or higher, </td></tr>'),

  initialize: function () {
  	console.log(this.model);

    this.render();
  },

  render: function() {

  	var data = {};
  	data.degrees = [];
  	data.schools = [];
  	data.fieldsOfStudy = [];
  	data.degreesAndFields = [];

  	var objConstructor = function(array, obj){
      for (var key in obj){		//BA, MBA, MS
        if(key != 'total'){
          var item = {};
          item.name = key;		//{name: BA}
          item.percentage = ((obj[key] / obj.total)*100 + "%");	//{name: BA, percentage: 55%}
          array.push(item);
        }
      }
    };
    console.log("degreesAndFields", this.model.attributes.degreesAndFields);

    objConstructor(data.degrees, this.model.get('degrees'));
    objConstructor(data.schools, this.model.get('schools'));
    objConstructor(data.fieldsOfStudy, this.model.get('fieldsOfStudy'));
    objConstructor(data.degreesAndFields, this.model.get('degreesAndFields'));



  //   this.$el.html('<th>Education</th>').append(
  //     data.degrees.map(function(degree){
  //       return context.$el.html(context.template(data));
  //     })
  //   );

		var context = this;
		console.log(context);

		context.$el.append('<h4>'+ this.model.get('position_name') + '</h4>');

  	data.degreesAndFields.forEach(function(degreesAndFields){
  		return context.$el.append(context.template({degreesAndFields: degreesAndFields}))
  	})


  }



})
