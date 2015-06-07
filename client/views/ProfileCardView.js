var ProfileCardView = Backbone.View.extend({
    el : '#profile-card',
    initialize : function() {
        this.render();
    },

    render : function() {
        this.$el.append('<div class="avatar-container">' +
        '<img src="' + this.model.get('pic') + '" alt="avatar" height="64" width="64">' +
        '</div>');

        this.$el.append('<div class="name-container">' + this.model.get('name') + '</div>');
        this.$el.append('<div class="current-position">' + this.model.get('currentPosition') + ' at ' + this.model.get('currentCompany') + '</div>');
        this.$el.append('<div class="location-container">' + this.model.get('location') + '</div>');
        return this.el;
    }
});
