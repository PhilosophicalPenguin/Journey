var ExperienceView = Backbone.View.extend({
    el:"#experienceDiv",
    model:PositionModel,
    className : 'ExperienceView',

    initialize : function () {
        console.log(this.model);
        this.render();
    },

    render : function () {
        this.$el.append('<h1>Previous Experience:</h1>');
        this.$el.append('<div id="experienceStatsDiv"></div>');
        var statsView = new PositionsStatsChartView({ el: '#experienceStatsDiv', model : this.model.get('info').positions });

    }
});
