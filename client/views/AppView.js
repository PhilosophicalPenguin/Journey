// AppView.js - Defines a backbone view class for the whole
window.AppView = Backbone.View.extend({

    initialize: function(params) {
        this.autocompleteView = new AutocompleteView({model: this.model});
        
        var context = this;
        this.listenTo(this.model, 'positionsReceived', function(){
            context.render();
        });
    },

    render: function(){
        this.$el.children().detach();
        if(this.discoverPathsView) {
            this.$el.append(this.discoverPathsView.$el);
        }
        return this.el;
    }
});
