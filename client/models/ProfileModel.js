var ProfileModel = Backbone.Model.extend({
    
    url: 'api/profiles/getProfile',

    initialize : function (id) {
        //fetch data from the server
        this.fetch( { data : $.param( { id : id } ) } );
    },

    parse : function(data) {
        //attach data to model
        console.log('data on profile model fetch', data);
        for(var key in data) {
            this.set(key, data[key]);
        }
        console.log('model after for loop on data', this);
        //trigger that the profile model has recieved its data
        this.trigger('RecievedData');
    }
});
