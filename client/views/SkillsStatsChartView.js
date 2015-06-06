window.SkillsStatsChartView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {

    //this.model: {total: 1832, Ruby on Rails: 28, Pair Programming: 2}

    var skills = [];
    var skillsNames = [];
    var skillsPercentages = [];

    for (var key in this.model) {

      if (key !== 'total') {

        skills.push([key, this.model[key].length]);

      }

    }

    skills.sort(function(a, b) {
      return b[1] - a[1];
    });

    skills = skills.splice(0, 9);
    skillsNames = skills.map(function(skillCombo) {
      return skillCombo[0];
    });
    skillsPercentages = skills.map(function(skillCombo) {
      return skillCombo[1];
    });

    var previousPoint = null;

    var skillsChart = {
      chart: {
        renderTo: this.$el,
        type: 'bar',
        marginLeft: 150,
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
        categories: skillsNames,
        labels: {
          style: {
              fontSize:'14px'
          }
        }
      },
      yAxis: {
        min: 0,
        max: 75,
        lineWidth: 0,
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        lineColor: 'transparent',
        title : {
          text : "Percentage"
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
          }
        }
      },
      series: [{
        showInLegend: false,
        data: skillsPercentages
      }],
      credits: {
        enabled: false
      }
    };

    this.$el.highcharts(skillsChart);




  }



});
