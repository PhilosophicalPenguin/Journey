var ExperienceView = Backbone.View.extend({
    el:"#experienceDiv",
    model:PositionModel,
    className : 'ExperienceView',

    initialize : function () {

        this.render();

    },

    render : function () {
        this.$el.append('<h3>Experience</h3>');
        this.$el.append('<div id="experienceStatsDiv" class="chartLarge"></div>');
        var statsView = new PositionsStatsChartView({
            el: '#experienceStatsDiv',
            model : this.model
        });

    }
});
