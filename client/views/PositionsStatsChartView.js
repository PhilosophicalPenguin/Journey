window.PositionsStatsChartView = Backbone.View.extend({

    model: PositionModel,

    initialize: function() {
      this.render();
    },


    render: function() {
        var data = [];
        var names = []; //an array of tuples
        var percentages = [];

        console.log('this model', this.model);

        //reduce total # you divde by since you're excluding Software Engineers
        for (var key in this.model.get('positions')) {
            if (key === "Software Engineer") {
                this.model.get('positions').total -= this.model.get('positions')[key].length;
            }
        }

        for (var wookey in this.model.get('positions')) {
            if (wookey !== 'total' && wookey != "Software Engineer") {
                var item = {};
                data.push([wookey, (this.model.get('positions')[wookey].length / this.model.get('positions').total) * 100]);
            }
        }

        //data[0]: [position, percentage]
        data.sort(function(a, b) {
            return a[1] < b[1];
        });



        var res = data.splice(0, 10);

        for (var i = 0; i < res.length; ++i) {
            names.push(res[i][0]);
            percentages.push(res[i][1]);
        }


        var context = this;

        // console.log("xAxis categories passed to table:", names);
        // console.log("yAxis percentages passed to table:", percentages);

        var previousPoint = null;
        var chart = {
              chart: {
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
                dataLabels: {
                  enabled: true,
                },
                series: {
                  groupPadding: 0.1,
                  cursor: 'pointer',
                  point: {
                    events: {
                      click: function(event) {
                        context.model.set('positionFilter', this.category);
                        context.model.createNewThumbnails(context.model.get('positions')[this.category].slice(0, 10));
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
    },

});
