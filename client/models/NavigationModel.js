window.NavigationModel = Backbone.Model.extend({

  url: 'api/queryPositions/getNav',

  initialize : function (currentPosition, allPositions) {

    this.fetch( {
      data:     $.param( { id: currentPosition.id } )
    } );
  
    this.set({
      positionsToAll:       allPositions,
      positionsToNames:     [],
      positionsFromNames:   [],
      currentPosition:      currentPosition.name
    });

    var context = this;

    var positionsToAll    = this.get('positionsToAll');
    
    for(var key in positionsToAll) {
      context.get('positionsToNames').push(key);
    };

  },
  
  parse: function(data) {
    this.set('positionsFromAll', data);

    var positionsFromAll  = this.get('positionsFromAll');

    for(var key in positionsFromAll) {
      this.get('positionsFromNames').push(key);
    }
  },

  fetchFilter: function(fromName, toName) {

    var toID = this.get('positionsToAll')[toName];
    var fromID = this.get('positionsFromAll')[fromName];

    clientRouter.navigate("filter/" + toID + '/' + fromID  , true );
  }

});
