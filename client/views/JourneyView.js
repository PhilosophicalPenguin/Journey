window.JourneyView = Backbone.View.extend({

	model: PositionModel,
	className: 'JourneyView',
  template: _.template('<tr><td><%=degree.percentage%> have a <%=degree.name%> or higher, </td></tr>'),

  // template: _.template("<h4> For the position <%= title %>: </h4><h3> Education </h3><ul><li><%= degrees['B.S.'] %> have a B.S. or higher, </li><li><%= degrees['M.B.A.'] %> have a M.B.A. or higher, </li><li><%= degrees['B.A.'] %> have a B.A. or higher </li></ul>"),
  initialize: function () {

    this.render();
  },

  render: function () {
    console.log('positionModel ', this.model)
    var statsTableView = new StatsTableView({model: this.model}, {field: 'degreesAndFields'} );

    this.$el.append(['<th>For the position</th>' + this.model.get('title'), statsTableView.$el]);
  }

});
