window.PositionsStatsChartView = Backbone.View.extend({
  initialize: function () {
    console.log(this.model);
    this.render();
  },

  render: function() {
    var data = [];
    var names = [];//an array of tuples
    var percentages = [];
    //create the tuples grabing their names and calculate the %
    // for(var key in this.model) {
    //   if(key!== 'total') {
    //     var item = {};
    //     names.push(key);
    //     percentages.push((this.model[key] / this.model.total)*100);
    //   }
    // }

     for(var wookey in this.model) {
      if(wookey === "Software Engineer") {
        this.model.total -= this.model[wookey];
      }
     }

    for(var key in this.model) {
      if(key!== 'total' && key != "Software Engineer") {
        var item = {};
        data.push([key, (this.model[key] / this.model.total)*100]);
      }
    }

    data.sort(function(a,b) { return a[1] < b[1]; });

    var res = data.splice(0,10);

    for(var i = 0; i < res.length; ++i) {
      names.push(res[i][0]);
      percentages.push(res[i][1]);
    }

    console.log("xAxis categories passed to table:", names);
    console.log("yAxis percentages passed to table:", percentages);

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
      tooltip : { 
        pointFormat : "Value: {point.y:.2f} %"
      },
      xAxis : {
        categories: names
      },
      yAxis : {
        min: 0,
        title : {
          text : "percentage"
        }
      },
      title: {
          text: 'Previous Roles:'
      },
      plotOptions: {
          column: {
              depth: 25
          }
      },
      series: [{
        showInLegend: false,
          data: percentages
      }],
      credits :{
        enabled :false
      }
    };

    this.$el.highcharts(chart);
  }

});
