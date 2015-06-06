var ProfileView = Backbone.View.extend({
    el : '#mainContent',
    model : ProfileModel,

    initialize : function() {
        console.log(this.model);
        this.render();
    },

    render : function() {
        this.$el.children().detach();
        this.$el.append(new NavBarView().render());
        this.$el.append('<div id="profile-card"></div>');
        new ProfileCardView( { model : this.model } );
        this.$el.append('<div id="timeline-div"></div>');
        this.$el.append(new TimelineView().render());
    }
});