var TimelineView = Backbone.View.extend({
    el : '#timeline-div',

    initialize : function() {
        //create TimelineItemsCollection
        this.timelineItems = new TimelineItemsCollection();
        var timelineItems = this.timelineItems;

        //grab reference to degrees array
        var degrees = this.model.get('degrees');
        var tl_Items = [];
        //iterate over degrees creating timeline item models
        for(var i = 0; i < degrees.length; ++i) {
            //use method to massage data into timeline item model
            tl_Items.push( degreeToTimelineItemModel( degrees[i] ) );
        }
        
        var experiences = this.model.get('experiences');
        //iterate over experience creating timeline item models
        for(var j = 0; j < experiences.length; ++j) {
            //use method to massage data into timeline item model
            tl_Items.push( experienceToTimelineItemModel(experiences[j]) );
        }

        //sort the collection of time line models base by start date
        tl_Items.sort(function(a,b) { return b.dates.start - a.dates.start; });
        this.timelineItems.add(tl_Items);
        this.render();
    },

    render : function() {
        this.$el.children().detach(); // clear the div of a previous elements
        this.$el.append('<h1>Timeline</h1>');
        d3.select(el).append('svg')
                    .classed('timeline-svg', true);
        //create the list to contain the time line items
        this.$el.append('<ul class="timelineList"></ul>');

        var $list = this.$('.timelineList');

        //iterate over each timeline item and render it
        this.timelineItems.forEach(function(timelineItem) {
            new TimeBlockView( { model : timelineItem, el : $list } );
        });


        //create TimeBlockViews
        return this.el;
    }
});

var degreeToTimelineItemModel = function (eduMilestone) {
    var obj = {};
    obj.type = 'Education';
    obj.dates = {
        start : Number(eduMilestone.start),
        end : Number(eduMilestone.end)
    };
    obj.text = {
        '1' : eduMilestone.degree + ' in ' + eduMilestone.fos,
        '2' : eduMilestone.school
    };

    return obj;
};

var experienceToTimelineItemModel = function (expMilestone) {
    var obj = {};
    obj.type = 'Experience';
    obj.dates = {
        start : Number(expMilestone.start),
        end : Number(expMilestone.end)
    };
    obj.text = {
        '1' : expMilestone.position,
        '2' : expMilestone.company
    };

    return obj;
};

