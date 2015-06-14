var SimilarPositionsModel = Backbone.Model.extend({
    
    url: 'api/profiles/getSimilarPositions',

    initialize : function (industryID) {
        //fetch data from the server

        this.fetch( { data : $.param( { 'id' : industryID } ) } );
    },

    parse : function(data) {
        
        console.log('data before parse on similar positions model', data);

        this.set('similarPositions', data);
        this.trigger('similarPositionsReceived');

    }
});
