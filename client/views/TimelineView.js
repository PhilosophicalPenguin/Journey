var TimelineView = Backbone.View.extend({
    el : '#timeline-div',

    initialize : function() {
        //create TimelineItemsCollection
        this.timelineItems = new TimelineItemsCollection();
        var timelineItems = this.timelineItems;

        this.earliestYear = Infinity;
        this.mostRecentYear = new Date().getFullYear();
        var context = this;
        var checkYears = function(year) {
            if(year !== 0) {
                if(year < context.earliestYear || context.earliestYear === 0) {
                    context.earliestYear = year;
                }
                if(year > context.mostRecentYear || context.mostRecentYear === 0) {
                    context.mostRecentYear = year;
                }
            }
        }

        //grab reference to degrees array
        var degrees = this.model.get('degrees');

        var tl_Items = [];
        //iterate over degrees creating timeline item models
        for(var i = 0; i < degrees.length; ++i) {
            //use method to massage data into timeline item model
            tl_Items.push( degreeToTimelineItemModel( degrees[i] ) );
            checkYears(Number(degrees[i].start));
        }
        
        var experiences = this.model.get('experiences');
        //iterate over experience creating timeline item models
        for(var j = 0; j < experiences.length; ++j) {
            //use method to massage data into timeline item model
            tl_Items.push( experienceToTimelineItemModel(experiences[j]) );
            checkYears(Number(experiences[j ].start));
        }

        console.log('DEGREES!!!', degrees);
        console.log('EXPERIENCES!!!', experiences);
        console.log('tl_items!!!', tl_Items);

        this.diffInYears = this.mostRecentYear - this.earliestYear;

        //sort the collection of time line models base by start date
        tl_Items.sort(function(a,b) { return b.dates.start - a.dates.start; });

        this.timelineItems.add(tl_Items);

        this.width = 750;
        this.height = 1200;
        this.borderBuffer = 75;
        this.xMidpoint = Math.floor(this.width / 2);

        this.render();
    },

    setSVG : function(svg) {
        this.SVG = svg;
        return this.SVG;
    },

    renderSegment : function (lineFunction, lineSegement) {
        return this.SVG.append('path')
                .attr('d', lineFunction(lineSegement))
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
    },

    render : function() {
        this.$el.children().detach(); // clear the div of a previous elements
        
        //create the svg for rendering the timeline too
        var svgContainer = d3.select(this.el).append('svg')
                                            .attr('width', this.width)
                                            .attr('height', this.height)
                                            .classed('timeline-svg', true);
        this.setSVG(svgContainer);

        var midpoint = this.xMidpoint;
        //create the main line segment for the timeline
        lineData = lineSegement(midpoint, this.borderBuffer, midpoint, this.height - this.borderBuffer);

        //set the iterpolation for creating a line from a set of points
        var lineFunction = d3.svg.line()
                                .x(function(d) { return d.x; })
                                .y(function(d) { return d.y; })
                                .interpolate("linear");

        var topYStop = Math.floor(this.borderBuffer / 2);
        var presentEndOfTimeline = lineSegement(midpoint, 10, midpoint, this.borderBuffer);
        var pastEndOfTimeline = lineSegement(midpoint, this.height - this.borderBuffer,midpoint, this.height);

        this.renderSegment(lineFunction, presentEndOfTimeline);
        this.renderSegment(lineFunction, lineData); // render main line segment
        this.renderSegment(lineFunction, pastEndOfTimeline).style("stroke-dasharray", ("2, 2")); //dashed line to represent past

        this.writeHeaders();

        var lineLength = lineData[1].y - lineData[0].y;
        var branchLength = 75;
        var context = this;
        //iterate over each timeline item and render it
        this.timelineItems.forEach(function(timelineItem, index, collection) {
            var x1 = midpoint; // start of brancg line
            var x2 = midpoint + branchLength; // end for branch line
            var left = false;

            var dates = timelineItem.get('dates');
            //var y = lineLength * ((context.diffInYears - (dates.start - context.earliestYear)) / context.diffInYears) + context.borderBuffer;
            var y = (lineLength * (index / collection.length)) + context.borderBuffer;
            var image;
            if(timelineItem.get('type') === "Education") // decide which side the branch should go on
            {
                image = './assets/education-icon.png'
                x2 = midpoint - branchLength;
                left = true;
            }
            else {
                image = './assets/briefcase-icon.png'
            }

            var rectOff = timelineItem.get('unitOffset');
            if(left) {
                rectOff = -rectOff;
            }
            // console.log(rectOff);
            // var midOfTimeChunk = context.renderTimeChunk(dates.start, dates.end, lineLength, left, rectOff);
            // var y = midOfTimeChunk.y;
            // var x1 = left ? midOfTimeChunk.x : midOfTimeChunk.x + 10;
            
            var lineBranch = lineSegement(x1, y, x2, y);
            context.renderSegment(lineFunction, lineBranch);

            var rectX = x2;
            var options = { 
                orderPosition  : index,
                cellX          : rectX, 
                cellY          : y,
                font_size      : '12px',
                leftOfTimeline : left
            };

            var imgs = context.SVG.append('image')
                .attr('xlink:href', image)
                .attr("x", x1 - 16)
                .attr("y", y - 16)
                .attr("width", "32")
                .attr("height", "32");

            //create TimeBlockViews
            new TimeBlockView( { model : timelineItem, el : context.SVG.node() }, options );
        });


        return this.el;
    },

    writeHeaders: function(){
        var midpoint = this.xMidpoint;
        var capArmLength = 75;
        var capYearFontSize = 18;
        var topYStop = Math.floor(this.borderBuffer / 2);

        this.SVG
            .append('text')
            .attr('x', midpoint - capArmLength * 2.1)
            .attr('y', topYStop - capYearFontSize / 2)
            .text('Education')
            .attr('font-family', 'sans-serif')
            .attr('font-size', capYearFontSize + 'px')
            .attr('fill', 'black');

        this.SVG
            .append('text')
            .attr('x', midpoint + capArmLength)
            .attr('y', topYStop - capYearFontSize / 2)
            .text('Experience')
            .attr('font-family', 'sans-serif')
            .attr('font-size', capYearFontSize + 'px')
            .attr('fill', 'black');
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

var point = function(x,y) {
    return { 'x' : x, 'y': y};
};

var lineSegement = function (x1,y1,x2,y2) {
    return [point(x1,y1), point(x2,y2)];
};


