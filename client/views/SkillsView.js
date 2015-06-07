var SkillsView = Backbone.View.extend({
    el:"#skillsDiv",
    model:PositionModel,
    className: 'SkillsView',

    initialize: function(){
        this.render();
    },

    render: function(){
        this.$el.append('<h3>Skills</h3>');
        this.$el.append('<div id="skillsChartDiv" class="chartLarge"></div>');
        var skillsView = new SkillsStatsChartView({el: '#skillsChartDiv', model: this.model});
    }
});