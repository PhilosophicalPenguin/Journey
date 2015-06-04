window.EducationChartView = Backbone.View.extend({
  initialize: function () {
    console.log(this.model);
    this.render();
  },

  render: function() {
    var educationData = [];//an array of tuples
    //create the tuples grabing their names and calculate the %
    for(var key in this.model) {
      if(key!== 'total') {
        var item = {};
        educationData.push([key, this.model[key]]);
      }
    }

    var chart = {
      chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: 'Contents of Highsoft\'s weekly fruit delivery'
        },
        subtitle: {
            text: '3D donut in Highcharts'
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: 'Delivered amount',
            data: educationData
        }]
    };

    this.$el.highcharts(chart);
  }

});
