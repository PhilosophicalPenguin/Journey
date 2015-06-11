window.FiltersCollectionView = Backbone.View.extend({
  
  tagName: "ul",
  className: "filteredPaths",
  model: FiltersCollection,

  initialize: function(){
    this.render();
  },

  events: {
    'click .clearResults' : 'showJourneyView',
  },

  showJourneyView: function() {
    clientRouter.navigate("journey/" + this.collection.models[0].attributes.toPositionID, true );
  },

  render: function(){

    $('.innerJourneyContent').children().detach();

    var length            = this.collection.length-1,
        fromPositionName  = this.collection.models[0].attributes.fromPosition,
        toPositionName    = this.collection.models[0].attributes.toPosition;

    this.$el.append(
      '<p><b>Result: </b> ' + length + ' paths from ' + fromPositionName + 
      ' to ' + toPositionName + '</p>' +
      '<div class="clearResults">Clear results</div>'
    );

    return this.$el.append(this.collection.map(function(path){

      if(!path.attributes.fromPosition) {
        var filterView = new FilterView({model: path});
        return filterView.el;
      }

    }));

  }

});