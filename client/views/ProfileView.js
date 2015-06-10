var ProfileView = Backbone.View.extend({
    el : '#mainContent',
    model : ProfileModel,

    initialize : function() {
        this.render();
    },

    render : function() {
        this.$el.children().detach();
        this.$el.append(new NavBarView().render());
        this.$el.append('<div id="profile-card"></div>');
        new ProfileCardView( { model : this.model } );
        this.$el.append('<div id="timeline-div"></div>');
        new TimelineView( { model : this.model } );
    }
});