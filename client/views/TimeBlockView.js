var TimeBlockView = Backbone.View.extend({
    model : TimelineItemModel,

    initialize : function() {
        this.render();
    },

    render : function () {
        var $listItem = this.$el.append('<li class="time-block-item"></li>');

        $listItem.append('<div class="time-block-type">' + this.model.get('type') + '</div>');
        var dates = this.model.get('dates');
        if(dates.start === dates.end) {
            $listItem.append('<div class="time-block-dates">' + this.model.get('dates').start + '</div>');
        }
        else {
            $listItem.append('<div class="time-block-dates">' + dates.start + ' - ' + dates.end + '</div>');
        }
        $listItem.append('<div class="time-block-text-1">' + this.model.get('text')['1'] + '</div>');
        $listItem.append('<div class="time-block-text-2">' + this.model.get('text')['2'] + '</div>');
    }
});
