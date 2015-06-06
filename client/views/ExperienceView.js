var ExperienceView = Backbone.View.extend({
    el:"#experienceDiv",
    model:PositionModel,
    className : 'ExperienceView',

    initialize : function () {
        this.render();
    },

    render : function () {
        this.$el.append('<h3>Previous Experience</h3>');
        this.$el.append('<div id="experienceStatsDiv"></div>');

        var context = this;
        var statsView = new PositionsStatsChartView({
            el: '#experienceStatsDiv',
            model : context.model.get('info').positions
        });

    }
});
