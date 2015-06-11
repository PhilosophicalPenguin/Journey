window.AboutUsView = Backbone.View.extend({

  model: AboutUsModel,

  tagName: 'div',
  template: _.template('<div class="about-us-image"><img src= <%=image%>><div class="about-us-name"><%=name%>'),

  initialize: function() {

    this.render()
  },

  render: function() {

    return this.$el.html(this.template(this.model.attributes));

  }

})


// ('<td class="play">(<%= artist %>)</td><td class="enqueue"><%= title %></td><td class="dequeue"><button>dequeue</button></td>')
