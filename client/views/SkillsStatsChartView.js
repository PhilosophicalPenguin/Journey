window.SkillsStatsChartView = Backbone.View.extend({

  initialize: function(){

      this.render();
  },

  render: function() {

    var skills = [];
    var skillsNames = [];
    var skillsPercentages = [];

    for (var key in this.model.get('skills')) {

      if (key !== 'total') {

        skills.push([key, this.model.get('skills')[key].length]);

      }

    }

    skills.sort(function(a, b) {
      return b[1] - a[1];
    });

    skills = skills.splice(0, 10);

    function shuffle(array) {
      var currentIndex = array.length,
          temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    skills = shuffle(skills);

    skillsNames = skills.map(function(skillCombo) {
      return skillCombo[0];
    });

    var maxPercentage = 0;
    skillsPercentages = skills.map(function(skillCombo) {
      if(skillCombo[1] > maxPercentage) {
        maxPercentage = skillCombo[1];
      }
      return skillCombo[1];
    });

    var previousPoint = null;
    var context = this;
    var skillsChart = {
      chart: {
        renderTo: this.$el,
        type: 'bar',
        polar: true
      },
      tooltip: {
        pointFormat: "{point.y:.2f}%"
      },
      xAxis: {
        categories: skillsNames,
        labels: {
          style: {
              fontSize:'16px'
          }
        }
      },
      yAxis: {
        min: 0,
        max: maxPercentage + 1,
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
          width: '200px'
        },
        series: {
          groupPadding: 0.1,
          cursor: 'pointer',
          point: {
            events: {
              click: function(event) {
                context.model.set('positionFilter', this.category);
                context.model.createNewThumbnails(context.model.get('skills')[this.category].slice(0, 10));
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
