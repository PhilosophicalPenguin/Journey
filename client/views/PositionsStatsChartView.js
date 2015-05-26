window.PositionsStatsChartView = Backbone.View.extend({
  initialize: function () {
    console.log(this.model);
    this.render();
  },

  render: function() {
    var names = [];//an array of tuples
    var percentages = [];
    //create the tuples grabing their names and calculate the %
    for(var key in this.model) {
      if(key!== 'total') {
        var item = {};
        names.push(key);
        percentages.push((this.model[key] / this.model.total)*100);
      }
    }

    var chart = {
      chart: {
          renderTo: this.$el,
          type: 'column',
          margin: 150,
          options3d: {
              enabled: false,
              alpha: 15,
              beta: 15,
              depth: 50,
              viewDistance: 25
          }
      },
      xAxis : {
        categories: names
      },
      yAxis : {
        min: 0,
        max: 25,
        title : {
          text : "percentage"
        }
      },
      title: {
          text: 'woo chart demo'
      },
      subtitle: {
          text: 'Test options by dragging the sliders below'
      },
      plotOptions: {
          column: {
              depth: 25
          }
      },
      series: [{
          data: percentages
      }],
      credits :{
        enabled :false
      }
    };

    this.$el.highcharts(chart);
  }

});
