window.SkillsStatsChartView = Backbone.View.extend({
    
    initialize: function(){
        console.log("initializing skillsChartView");
        this.render();
    },

    render: function(){


        console.log("this.model in skills view:", this.model);

        //this.model: {total: 1832, Ruby on Rails: 28, Pair Programming: 2}

        var skills = [];
        var skillsNames = [];
        var skillsPercentages = [];

        for(var key in this.model){

            if(key!== 'total'){

                skills.push([key, this.model[key].length]);

            }

        }

        // console.log("skills", skills);

        skills.sort(function(a, b){
            return a[1] < b[1];
        });

        skills = skills.splice(0, 9);
        skillsNames = skills.map(function(skillCombo){
            return skillCombo[0];
        });
        skillsPercentages = skills.map(function(skillCombo){
            return skillCombo[1];
        });

        console.log("skillsNames xAxis passed to chart:", skillsNames);
        console.log("skillsPercentages Axis passed to chart:", skillsPercentages);

        var skillsChart = {
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
            categories: skillsNames
          },
          yAxis : {
            min: 0,
            max: 75,
            title : {
              text : "percentage"
            }
          },
          title: {
              text: 'Current Skills:'
          },
          plotOptions: {
              column: {
                  depth: 25
              }
          },
          series: [{
            showInLegend: false,
              data: skillsPercentages
          }],
          credits :{
            enabled :false
          }
        };

        this.$el.highcharts(skillsChart);




    }



});