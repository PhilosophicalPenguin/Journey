var ProfileCardView = Backbone.View.extend({
    initialize : function() {
    },

    render : function() {
        this.$el.append('<div> Place picture</div>');
        this.$el.append('<div> Place name</div>');
        this.$el.append('<div> Place current position</div>');
        this.$el.append('<div> Place location</div>');
        return this.el;
    }
});
