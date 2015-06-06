// var TimeblockView = Backbone.View.extend({

//     initialize : function() {
//     },

//     render : function () {
//         this.$el.append(
//     }
// });


var TimelineView = Backbone.View.extend({
    el : '#timeline-div',

    initialize : function() {

    },

    render : function() {
        this.$el.children().detach();
        this.$el.append('<div>The time line will go here</div>');
        this.$el.append('<section id="cd-timeline" class="cd-container"></section>');
        return this.el;
    }
});
