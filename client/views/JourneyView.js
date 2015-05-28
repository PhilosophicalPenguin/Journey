var JourneyView = Backbone.View.extend({

	model: PositionModel,
	tagName: 'table',
  template: _.template('<tr><td><%=degree.percentage%> have a <%=degree.name%> or higher, </td></tr>'),

  // template: _.template("<h4> For the position <%= title %>: </h4><h3> Education </h3><ul><li><%= degrees['B.S.'] %> have a B.S. or higher, </li><li><%= degrees['M.B.A.'] %> have a M.B.A. or higher, </li><li><%= degrees['B.A.'] %> have a B.A. or higher </li></ul>"),

  initialize: function () {

  		console.log("NEW JOURNEY VIEW CREATED, model degrees:", this.model.get("degrees"))

      this.render();
  },

  render: function () {

  	var data = {};
  	data.degrees = [];
  	data.schools = [];
  	data.fieldsOfStudy = [];
  	data.degreesAndFields = [];
  	// data.title = this.model.attributes.title;
  	// data.totalDegrees = this.model.attributes.degrees.total;
  	// data.degrees = [];

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

  	// for(var degree in this.model.attributes.degrees){
  	// 	data.degrees.push(degree)
  	// };



    // this.$el.html(this.template(data));

  // // 	return data.degrees.forEach(function(degree){
  // // 		context.$el.html(context.template(data))
  // // 	})
  // // }

  // this.$el.children().detach();

  //   this.$el.html('<th>Education</th>').append(
  //     data.degrees.map(function(degree){
  //       return context.$el.html(context.template(data));
  //     })
  //   );

		var context = this;
		console.log(context);

  	data.degrees.forEach(function(degree){
  		return context.$el.append(context.template({degree: degree}))
  	})

}

});

// data:
// 	{
// 		title: 'software engineer',
// 		degrees: [],
// 		fieldsOfStudy: [],

// 	}
