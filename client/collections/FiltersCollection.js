var FiltersCollection = Backbone.Collection.extend({
  
  model: FilterModel,

  url: 'api/queryPositions/getFilter',

  initialize : function (fromID, toID) {

    // fetch data from the server
    this.fetch( {
      data:     $.param( { fromID: fromID, toID: toID } ),
      success:  this.fetchSuccess,
      error:    this.fetchError
    } );
  },

  fetchSuccess: function (collection, response) {
    collection.trigger('RecievedData');
  },

  fetchError: function (collection, response) {
    throw new Error("Filters collection fetch error");
  }

});
