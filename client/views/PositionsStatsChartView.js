window.PositionsStatsChartView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    var data = [];
    var names = []; //an array of tuples
    var percentages = [];
    //create the tuples grabing their names and calculate the %
    // for(var key in this.model) {
    //   if(key!== 'total') {
    //     var item = {};
    //     names.push(key);
    //     percentages.push((this.model[key] / this.model.total)*100);
    //   }
    // }

    for (var key in this.model) {
      if (key === "Software Engineer") {
        this.model.total -= this.model[key].length;
      }
    }

    for (var wookey in this.model) {
      if (wookey !== 'total' && wookey != "Software Engineer") {
        var item = {};
        data.push([wookey, (this.model[wookey].length / this.model.total) * 100]);
      }
    }

    //data[0]: [position, percentage]
    console.log('data before sort:', data);
    data.sort(function(a, b) {
      return b[1] - a[1];
    });
    console.log('data after sort:', data);

    var res = data.splice(0, 10);

    for (var i = 0; i < res.length; ++i) {
      names.push(res[i][0]);
      percentages.push(res[i][1]);
    }

<<<<<<< HEAD
    var previousPoint = null;
=======
>>>>>>> Render new autocomplete search bar on nav bar, styling, set min-length for search to 2

var previousPoint = null;
    var chart = {
      chart: {
<<<<<<< HEAD
        renderTo: this.$el,
        type: 'bar',
        marginLeft: 150,
        style: {
          fontFamily: 'Helvetica, sans-serif'
        },
        options3d: {
          enabled: false,
          alpha: 15,
          beta: 15,
          depth: 50,
          viewDistance: 25
        }
=======
          renderTo: this.$el,
          type: 'bar',
          margin: 100,
          options3d: {
              enabled: false,
              alpha: 15,
              beta: 15,
              depth: 50,
              viewDistance: 25
          }
>>>>>>> Render new autocomplete search bar on nav bar, styling, set min-length for search to 2
      },
      tooltip: {
        pointFormat: "{point.y:.2f}%"
      },
      xAxis: {
        categories: names,
        labels: {
          style: {
            fontSize: '14px'
          }
        }
      },
      yAxis: {
        min: 0,
        lineWidth: 0,
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        lineColor: 'transparent',
        title: {
          text: "Percentage"
        }
      },
      title: {
        text: null
      },
      plotOptions: {
<<<<<<< HEAD
        dataLabels: {
          enabled: true,
        },
        series: {
          groupPadding: 0.1,
          cursor: 'pointer',
          point: {
            events: {
              click: function(event) {
                console.log(this);
                if (previousPoint) {
                  previousPoint.update({
                    color: '#7cb5ec'
                  }, true, false);
                }
                previousPoint = this;
                this.update({
                  color: '#fe5800'
                });
              }
            } // this.update({ color: '#fe5800' }, true, false);
=======
          dataLabels: {
            enabled: true
          },
          series:{
            point: {
              events: {
                click: function (event) {
                  console.log(this);

                    if (previousPoint) {
                      previousPoint.update({ color: '#7cb5ec' }, true, false);
                    }
                    previousPoint = this;
                    this.update({ color: '#fe5800' });
                }
              }      // this.update({ color: '#fe5800' }, true, false);
            }
>>>>>>> Render new autocomplete search bar on nav bar, styling, set min-length for search to 2
          }
        }
      },
      series: [{
        showInLegend: false,
        data: percentages
      }],
      credits: {
        enabled: false
      }
    };

    this.$el.highcharts(chart);
  }

});
