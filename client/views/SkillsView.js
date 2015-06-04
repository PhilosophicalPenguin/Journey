var SkillsView = Backbone.View.extend({
    el:"#skillsDiv",
    model:PositionModel,
    className: 'SkillsView',

    initialize: function(){
        console.log("initializing skillsView");
        this.render();
    },

    render: function(){

        this.$el.append('<h1> Skills </h1>');
        this.$el.append('<div id="skillsChartDiv"></div>');
        var skillsView = new SkillsStatsChartView({el: '#skillsChartDiv', model: this.model.get('info').skills});

    }



});