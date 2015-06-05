var ProfileModel = Backbone.model.extend({
    
    url: 'api/getProfile/'

    initialize : function () {
        //fetch data from the server
    },

    parse : function(data) {
        //attach data to model
        //trigger that the profile model has recieved its data
    }
});