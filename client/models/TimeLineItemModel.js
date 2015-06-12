var TimelineItemModel = Backbone.Model.extend({
    
    initialize : function(obj) {
        for(var key in obj) {
            this.set(key, obj[key]);
        }
    },

    render : function() {

    }
});