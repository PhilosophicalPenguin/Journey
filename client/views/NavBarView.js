var NavBarView = Backbone.View.extend({
  el: '#nav-bar-div-container',
    initialize : function () {
      this.render();
    },

    render : function() {
      this.$el.children().detach();
      // console.log('this el nav bar', this.$el)

        //this.$el.children().detach();

        this.$el.append('<header class="navbar navbar-static-top" role="navigation">' +
          '<div class="container">' +
            '<div class="navbar-header">' +
              '<a href="#/"><h1>Journey</h1></a>' +
            '</div>' +
              '<form class="navbar-form"><input class="header-search" id="autocomplete" placeholder="What position are you considering?">' +
              '</form>' +
          '</div>' +
        '</header>');
    }
});
