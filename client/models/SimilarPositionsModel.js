var SimilarPositionsModel = Backbone.Model.extend({
    
    url: 'api/profiles/getSimilarPositions',

    initialize : function (industryID) {
        //fetch data from the server

        this.fetch( { data : $.param( { 'id' : industryID } ) } );
    },

    parse : function(data) {
        
        this.set('similarPositions', data.slice(0, 10));
        this.trigger('similarPositionsReceived');

    }
});
