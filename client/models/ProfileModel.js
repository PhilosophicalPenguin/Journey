var ProfileModel = Backbone.Model.extend({
    
    url: 'api/profiles/getProfile',

    initialize : function (id) {
        //fetch data from the server
        this.fetch( { data : $.param( { id : id } ) } );
    },

    parse : function(data) {
        //attach data to model
        for(var key in data) {
            this.set(key, data[key]);
        }
        //trigger that the profile model has recieved its data
        this.trigger('RecievedData');
    }
});
