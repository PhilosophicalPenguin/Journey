var ProfileModel = Backbone.Model.extend({
    
    url: 'api/getProfile/',

    initialize : function (id) {
        console.log('init profile model, this is the model', this);
        console.log('init profile model, id param is ', id);
        //fetch data from the server
    },

    parse : function(data) {
        //attach data to model
        //trigger that the profile model has recieved its data
    }
});
