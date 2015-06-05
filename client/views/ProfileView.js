var ProfileView = Backbone.View.extend({
    el : '#mainContent',
    initialize : function() {
        this.render();
    },

    render : function() {
        this.$el.children().detach();
        this.$el.append(new NavBarView().render());
        this.$el.append(new ProfileCardView( ).render());
    }
});