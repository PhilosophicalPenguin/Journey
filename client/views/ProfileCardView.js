var ProfileCardView = Backbone.View.extend({
  el: '#profile-card',
  initialize: function() {
    this.render();
  },

  render: function() {

    var picURL = this.model.get('pic') || '../assets/monkey.png'

    this.$el.append(
      '<img src="' + picURL + '" alt="Profile picture">' +
      '<div class="profileCardInfo">' +
        '<h1>' + this.model.get('name') + '</h1>' +
        '<h2>' + this.model.get('currentPosition') + ' at ' + this.model.get('currentCompany') + '</h2>' +
        '<h2>' + this.model.get('location') + '</h2>' +
      '</div>'
    );

    return this.el;
  }
});
