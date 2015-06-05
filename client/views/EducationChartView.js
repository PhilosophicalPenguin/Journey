window.EducationChartView = Backbone.View.extend({
  initialize: function () {
    console.log(this.model);
    this.render();
  },

  render: function() {
    var educationData = [];//an array of tuples
    //create the tuples grabing their names and calculate the %
    // this.model.HackReactor = 100;
    // this.model.total += this.model.HackReactor;

    //this.model: {'bachelors_comp_sci': 2, 'masters_cs': 4}


    for(var key in this.model) {
      if(key!== 'total') {
        var item = {};
        var name = key.replace('_', ' in ');
        if(key === '_') {
            educationData.push(['unlisted', this.model[key].length]);
        } else {
            if(key === 'Other_'){
                name = 'Other';
            }
            educationData.push([name, this.model[key].length]);
        }
      }
    }

    educationData.sort(function(a,b) { return a[1] < b[1]; });
    educationData = educationData.splice(0,10);

    console.log("EDUCATION DATA AFTER SPLICE::::::", educationData);

    var chart = {
      chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: 'Degrees Obtained:'
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: 'percentage',
            data: educationData
        }]
    };

    this.$el.highcharts(chart);
  }

});
