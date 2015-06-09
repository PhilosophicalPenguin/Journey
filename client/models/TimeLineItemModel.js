var TimelineItemModel = Backbone.Model.extend({
    
    initialize : function(obj) {
        this.set('type', obj.type);
        this.set('dates', obj.dates);
        this.set('text', obj.text);
        console.log('in the model', obj.unitOffset)
        this.set('unitOffset', obj.unitOffset);
    },

    render : function() {

    }
});