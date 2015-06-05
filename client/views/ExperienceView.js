var ExperienceView = Backbone.View.extend({
    el:"#experienceDiv",
    model:PositionModel,
    className : 'ExperienceView',

    initialize : function () {
        console.log('model from experience view', this.model);
        this.render();
    },

    render : function () {
        this.$el.append('<h1>Previous Experience</h1>');
        this.$el.append('<div id="experienceStatsDiv"></div>');

        var context = this;
        var statsView = new PositionsStatsChartView({
            el: '#experienceStatsDiv',
            model : context.model.get('info').positions
        });

    }
});
