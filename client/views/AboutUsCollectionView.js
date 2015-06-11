window.AboutUsCollectionView = Backbone.View.extend({

  el: '#mainContent',

  collection: AboutUsCollection,

  initialize: function() {
    this.render()
  },

  render: function() {

    this.$el.children().detach();

    this.$el.append(this.collection.map(function(teamMember){
      return new AboutUsView({model:teamMember}).render();
      })
    )
  }

})
