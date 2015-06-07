window.EducationChartView = Backbone.View.extend({
  initialize: function () {

    this.render();
  },

  render: function() {
    var educationData = [];

    for(var key in this.model.get('degreesAndFields')){
      if(key!== 'total') {
        var item = {};
        var name = key.replace('_', ' in ');
        if(key === '_') {
            educationData.push(['unlisted', this.model.get('degreesAndFields')[key].length]);
        } else {
            if(key === 'Other_'){
                name = 'Other';
            }
            educationData.push([name, this.model.get('degreesAndFields')[key].length]);
        }
      }
    }

    educationData.sort(function(a,b) { return a[1] < b[1]; });
    educationData = educationData.splice(0,10);

    var context = this;
    var chart = {
      chart: {
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
        tooltip : {
            pointFormat : "{point.percentage:.2f}%"
        },
        title: {
            text: null
        },
        plotOptions: {
            pie: {
                innerSize: 0,
                depth: 45,
                allowPointSelect: true,
                cursor: 'pointer',
                point: {
                    events: {
                        click: function(event){
                            context.model.set('positionFilter', this.name);
                            context.model.createNewThumbnails(context.model.get('degreesAndFields')[this.name.replace(" in ", "_")].slice(0, 10))
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.percentage:.1f}%',
                    color: '#606060',
                    style: { lineHeight: '18px', fontSize: '14px', fontWeight: 'normal' }
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
            enabled :false
        }
    };

    this.$el.highcharts(chart);
  }

});
