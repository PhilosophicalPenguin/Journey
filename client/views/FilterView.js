window.FilterView = Backbone.View.extend({

  tagName: "li",
  model: FilterModel,
  className: 'filterPath',

  initialize: function() {

    this.render();
  },

  events: {
    'click': 'sendToProfile'
  },

  render: function() {

    console.log("THIS.MODEL IN FILTERVIEW: ", this.model);

    var name          =   this.model.get('name'),
        picURL        =   this.model.get('picURL') || 'http://clipartist.net/RSS/openclipart.org/2012/June/monkey_face_cartoon-999px.png',
        location      =   this.model.get('currentLocation'),
        fromPosition  =   this.model.get('filteredPosition'),
        fromCompany   =   this.model.get('filteredCompany'),
        fromStart     =   this.model.get('filteredStart'),
        fromEnd       =   this.model.get('filteredEnd'),
        toPosition    =   this.model.get('headline'),
        toStart       =   this.model.get('currentStart');

    // append DOM elements to the $el property
    return this.$el.append(
      '<img src="' + picURL + '">' +
      '<div class="filterProfileInfo">' +
        '<h1>' + name + '</h1>' +
        '<h2>' + location + '</h2>' +
      '</div>' +

      '<div class="filterFrom">' +
        '<h2>' + fromPosition + '</h2>' +
        '<h2>' + fromCompany + '</h2>' +
        '<h3>' + fromStart + ' - ' + fromEnd + '</h3>' +
      '</div>' +

      '<div class="filterArrow"></div>' +

      '<div class="filterTo">' +
        '<h2>' + toPosition + '</h2>' +
        '<h3>' + toStart + ' - ' + 'present</h3>' +
      '</div>'

      );

  },

  sendToProfile: function() {

    clientRouter.navigate("profile/" + this.model.get('id'), true);

  }

});
