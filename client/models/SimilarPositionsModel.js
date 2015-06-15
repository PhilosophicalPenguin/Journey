var SimilarPositionsModel = Backbone.Model.extend({
    
    url: 'api/profiles/getSimilarPositions',

    initialize : function (industryID) {
        this.fetch( { data : $.param( { 'id' : industryID } ) } );
    },

    parse : function(data) {
        this.set('similarPositions', data);
        this.trigger('similarPositionsReceived');
    }
});
