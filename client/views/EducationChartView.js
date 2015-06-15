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
                console.log('this from edu', this);
                console.log("this.name: ", this.name);
                console.log("context.model.get('degreesAndFields')", context.model.get('degreesAndFields'));
                context.model.set('positionFilter', this.name);   //Other

                if(this.name === "Other"){
                  context.model.createNewThumbnails(context.model.get('degreesAndFields').Other_.slice(0, 10));                
                } else {
                  context.model.createNewThumbnails(context.model.get('degreesAndFields')[this.name.replace(" in ", "_")].slice(0, 10));                
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
