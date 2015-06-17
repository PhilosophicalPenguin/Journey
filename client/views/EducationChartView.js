window.EducationChartView = Backbone.View.extend({
  initialize: function() {

    this.render();
  },

  render: function() {
    var educationData = [];

    for (var key in this.model.get('degreesAndFields')) {
      if (key !== 'total') {
        var item = {};
        var name = key.replace('_', ' in ');
        if (key === '_') {
          educationData.push(['unlisted', this.model.get('degreesAndFields')[key].length]);
        } else {
          if (key === 'Other_') {
            name = 'Other';
          }
          if (key === 'Master_') {
            name = 'Master';
          }
          if (key === 'MBA_') {
            name = 'MBA';
          }
          if (key === 'Bachelor_') {
            name = 'Bachelor';
          }
          educationData.push([name, this.model.get('degreesAndFields')[key].length]);
        }
      }
    }

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
    
    educationData.sort(function(a, b) {
      return b[1] - a[1];
    });

    educationData = educationData.splice(0, 8);
    var context = this;
    var chart = {
      chart: {
        marginLeft: 0,
        type: 'pie',
        options3d: {
          enabled: false,
          alpha: 45
        },
        style: {
          fontFamily: 'Helvetica, sans-serif'
        },
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      tooltip: {
        pointFormat: "{point.percentage:.2f}%"
      },
      title: {
        text: null
      },
      plotOptions: {
        pie: {
          size: '68%',
          innerSize: 50,
          depth: 45,
          allowPointSelect: true,
          cursor: 'pointer',
          point: {
            events: {
              click: function(event) {
                
                context.model.set('positionFilter', this.name);   //Other

                if(this.name === "Other"){
                  context.model.createNewThumbnails(shuffle(context.model.get('degreesAndFields').Other_));
                }
                else if (this.name === "Bachelor") {
                  context.model.createNewThumbnails(shuffle(context.model.get('degreesAndFields').Bachelor_));
                }
                else if (this.name === "Master") {
                  context.model.createNewThumbnails(shuffle(context.model.get('degreesAndFields').Master_));
                }
                else if (this.name === "MBA") {
                  context.model.createNewThumbnails(shuffle(context.model.get('degreesAndFields').MBA_)); 
                }
                else {
                  context.model.createNewThumbnails(shuffle(context.model.get('degreesAndFields')[this.name.replace(" in ", "_")]));
                }

              }
            }
          },
          dataLabels: {
            enabled: true,
            allowOverlap: false,
            format: '{point.name}: {point.percentage:.1f}%',
            color: '#606060',
            style: {
              width: '270px',
              connectorPadding: 250,
              padding: '50px',
              lineHeight: '16px',
              fontSize: '16px',
              fontWeight: 'normal'
            }
          }
        },
        series: {
          cursor: 'pointer'
        }
      },
      series: [{
        name: 'Percentage',
        data: educationData
      }],
      credits: {
        enabled: false
      }
    };

    this.$el.highcharts(chart);
  }

});
