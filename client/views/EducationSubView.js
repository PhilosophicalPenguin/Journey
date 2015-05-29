var EducationSubivew = Backbone.View.extend({

	model: PositionModel;
	tagName: 'table',
	className: 'EducationTable',

  template: _.template('<tr><td><%=degree.percentage%> have a <%=degree.name%> or higher, </td></tr>'),

  initialize: function () {

    this.render();
  },



})
