window.NavigationView = Backbone.View.extend({
  el: "#navigation",
  model: NavigationModel,
  className: 'NavigationView',

  initialize: function () {

    this.render();

    this.$el.find("#navigateTo").autocomplete({
      source: this.model.attributes.positionsToNames,
      // minLength: 0
    });
    //  .focus(function(){
    //   $(this).autocomplete('search', '');
    // });

    this.$el.find(".navigateFrom").autocomplete({
      source: this.model.attributes.positionsFromNames,
      minLength: 0
    })
    .focus(function(){
      $(this).autocomplete('search', '');
    });

  },

  events: {
    'submit': 'getFilter',
    'keyup' : 'checkVal',
    'change #navigateTo' : 'renderNav',
    'autocompleteselect #navigateTo': 'renderNav',
    'autocompleteselect' : function(){
      $('.showPaths').removeAttr("disabled");
    },
    'click .showAll' : 'showMenu'
  },

  showMenu: function() {
    $(".navigateFrom").autocomplete( "widget" ).is( ":visible" );
  },

  renderNav: function(e, ui) {
    var navTo;
    if(ui === undefined){
      navTo = $("#navigateTo").val();
    }
    else {
      navTo = ui.item.value;
    }

    var toPositions = this.model.get('positionsToAll');
    if(toPositions[navTo]) {
      var newPosition = {
        id: toPositions[navTo],
        name: navTo
      };
      this.model.trigger('ChangedToField', newPosition);
    }
  },

  checkVal: function(e) {
    e.preventDefault();
    if(this.$el.find(".navigateFrom").val() === '' || this.$el.find("#navigateTo").val() === '') {
      $('.showPaths').prop('disabled', true);
    }
    else {
      $('.showPaths').removeAttr("disabled");
    }
  },

  getFilter: function(e) {
    e.preventDefault();
    var navTo = this.$el.find("#navigateTo").val();
    var navFrom = this.$el.find(".navigateFrom").val();

    this.model.fetchFilter(navFrom, navTo);
  },

  render: function () {

    this.$el.children().detach();

    this.$el.append(
      
      '<div class="filterField fromField ui-widget">' +
        '<label for="navigateFrom">From:</label>' +
        '<input class="navigateFrom" placeholder="Your current job...">' +
        // '<div class="showAll"></div>' + 
      '</div>' +
      
      '<div class="filterField">' +
        '<label for="navigateTo">To:</label>' +
        '<input id="navigateTo" placeholder="Your dream job..." value="' + this.model.get('currentPosition') + '">' +
      '</div>' +


      '<button class="btn btn-info showPaths" disabled="true">Show Paths</button>'

    );

  }

});