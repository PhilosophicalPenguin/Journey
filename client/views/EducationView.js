var EducationView = Backbone.View.extend({
    el:"#educationDiv",
    model:PositionModel,
    className : 'EducationView',

    initialize : function () {

        this.render();
    },

    render : function () {
        this.$el.append('<h3>Education</h3>');
        this.$el.append('<div id="educationStatsDiv"></div>');
        var statsView_ = new EducationChartView({ el: '#educationStatsDiv', model : this.model.get('info').degreesAndFields });
    }
});
