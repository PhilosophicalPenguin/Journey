var PositionModel = Backbone.Model.extend({
  url: '/api/queryPositions/getStats',

  initialize: function(obj, id) {
    if (obj) {
      for (var key in obj) {
        this.set(key, obj[key]);
      }
    } else {
      this.set('position_id', id);
    }
  },

  createNewThumbnails: function(thumbnailsToCreate) {
    this.trigger('createThumbnails', thumbnailsToCreate);
  },

  parse: function(response) {
    for (var key in response) {
      this.set(key, response[key]);
    }

    this.trigger('RecievedStats');

    return response;
  },

  viewPosition: function() {
    this.trigger('view', this);
  },

  retrieveStats: function() {
    this.fetch({
      data: $.param({
        id: this.get('position_id')
      })
    });
  }

});
