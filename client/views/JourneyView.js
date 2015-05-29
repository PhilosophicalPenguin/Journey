var JourneyView = Backbone.View.extend({

	model: PositionModel,
	tagName: 'table',
  template: _.template('<tr><td><%=degree.percentage%> have a <%=degree.name%> or higher, </td></tr>'),

  // template: _.template("<h4> For the position <%= title %>: </h4><h3> Education </h3><ul><li><%= degrees['B.S.'] %> have a B.S. or higher, </li><li><%= degrees['M.B.A.'] %> have a M.B.A. or higher, </li><li><%= degrees['B.A.'] %> have a B.A. or higher </li></ul>"),

  initialize: function () {

    this.render();
  },

  render: function () {

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

    objConstructor(data.degrees, this.model.attributes.degrees);
    objConstructor(data.schools, this.model.attributes.schools);
    objConstructor(data.fieldsOfStudy, this.model.attributes.fieldsOfStudy);
    objConstructor(data.degreesAndFields, this.model.attributes.degreesAndFields);

    console.log("data", JSON.stringify(data));


  //   this.$el.html('<th>Education</th>').append(
  //     data.degrees.map(function(degree){
  //       return context.$el.html(context.template(data));
  //     })
  //   );

		var context = this;
		console.log(context);

		context.$el.append('<h4>'+ this.model.get('title') + '</h4>');

  	data.degrees.forEach(function(degree){
  		return context.$el.append(context.template({degree: degree}))
  	})

  	// this.positionView = new PositionView({model: this.model});
  	// this.$el.append(this.positionView.$el);
}

});

// data:
// 	{
// 		title: 'software engineer',
// 		degrees: [],
// 		fieldsOfStudy: [],

// 	}
