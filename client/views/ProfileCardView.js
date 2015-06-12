var ProfileCardView = Backbone.View.extend({
  el: '#profile-card',
  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.append(
      '<img src="' + this.model.get('pic') + '" alt="Profile picture">' +
      '<div class="profileCardInfo">' +
        '<h1>' + this.model.get('name') + '</h1>' +
        '<h2>' + this.model.get('currentPosition') + ' at ' + this.model.get('currentCompany') + '</h2>' +
        '<h2>' + this.model.get('location') + '</h2>' +
      '</div>'
    );

    return this.el;
  }
});
