var EducationView = Backbone.View.extend({
    el:"#educationDiv",
    model:PositionModel,
    className : 'EducationView',

    initialize : function () {
        console.log(this.model);
        this.render();
    },

    render : function () {
        this.$el.append('<h1>Education</h1>');
        this.$el.append('<div id="educationStatsDiv"></div>');
        var statsView_ = new EducationChartView({ el: '#educationStatsDiv', model : this.model.get('info').degreesAndFields });
    }
});
