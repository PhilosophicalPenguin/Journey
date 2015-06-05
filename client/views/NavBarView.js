var NavBarView = Backbone.View.extend({
    initialize : function () {

    },

    render : function() {
        this.$el.children().detach();
        this.$el.append('<header class="navbar navbar-static-top" role="navigation"><div class="container"><div class="navbar-header"><a href="#/"><h1>Journey</h1></a></div></div></header>');
        return this.el;
    }
});
