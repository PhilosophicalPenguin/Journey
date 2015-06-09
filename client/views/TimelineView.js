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

        this.diffInYears = this.mostRecentYear - this.earliestYear;

        //sort the collection of time line models base by start date
        tl_Items.sort(function(a,b) { return b.dates.start - a.dates.start; });


        var timeGrid = organizePlacement(tl_Items, this.earliestYear, this.mostRecentYear);

        for(var m = 0; m < timeGrid.length; ++m) {
            for(var eduIter = 0; eduIter < timeGrid[m]['Education'].length; ++eduIter) {
                if(tl_Items[timeGrid[m]['Education'][eduIter]])
                    tl_Items[timeGrid[m]['Education'][eduIter]].unitOffset = eduIter;
            }
            for(var expIter = 0; expIter < timeGrid[m]['Experience'].length; ++expIter) {
                if(tl_Items[timeGrid[m]['Experience'][expIter]])
                    tl_Items[timeGrid[m]['Experience'][expIter]].unitOffset = expIter;
            }
        }

        this.timelineItems.add(tl_Items);

        this.width = 1000;
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
                .attr('stroke-width', 6)
                .attr('fill', 'none');
    },

    renderTimeChunk : function(startYear, endYear, lineLength, left, xOffset) {
        var xPosition = this.xMidpoint + xOffset;
        // 0 , 0 in upper left thats why the endYear is used in positioning the y value of the rect
        var yPosition = lineLength * ((this.diffInYears - (endYear - this.earliestYear)) / this.diffInYears) + this.borderBuffer;
        // 0, 0 in upper left thats why startYear is used to figure out where time chunk ends
        var yEnd = lineLength * ((this.diffInYears - (startYear - this.earliestYear)) / this.diffInYears) + this.borderBuffer;
        var width = 10;
        var height = yEnd - yPosition;
        height = height || 1;
        xPosition -= left ? width : 0;

        var rect = this.SVG
                      .append('rect')
                          .attr('x', xPosition)
                          .attr('y', yPosition)
                          .attr('rx', 15)
                          .attr('ry', 15)
                          .attr('width', width)
                          .attr('height', height)
                          .attr('stroke', 'black')
                          .attr('stroke-width', 2)
                          .attr('fill', 'blue')
                          .classed('timeChunk', true);

        return point(xPosition, yPosition + height / 2);
    },

    render : function() {
        this.$el.children().detach(); // clear the div of a previous elements
        this.$el.append('<h1>Timeline</h1>');


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
        var capArmLength = 75;
        var topPerpendicular = lineSegement(midpoint - capArmLength, topYStop, midpoint + capArmLength, topYStop);
        var presentEndOfTimeline = lineSegement(midpoint, topYStop, midpoint, this.borderBuffer);
        var pastEndOfTimeline = lineSegement(midpoint, this.height - this.borderBuffer,midpoint, this.height);

        this.renderSegment(lineFunction, topPerpendicular);
        this.renderSegment(lineFunction, presentEndOfTimeline);
        this.renderSegment(lineFunction, lineData); // render main line segment
        this.renderSegment(lineFunction, pastEndOfTimeline).style("stroke-dasharray", ("2, 2")); //dashed line to represent past

        var capYearFontSize = 24;
          this.SVG
            .append('text')
            .attr('x', midpoint - capArmLength / 3)
            .attr('y', topYStop - capYearFontSize / 2)
            .text(new Date().getFullYear())
            .attr('font-family', 'sans-serif')
            .attr('font-size', capYearFontSize + 'px')
            .attr('fill', 'black');

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
}

var lineSegement = function (x1,y1,x2,y2) {
    return [point(x1,y1), point(x2,y2)];
}

var organizePlacement = function(collection, start, end) {
    var gridMap = [];
    var row = function() { return { 'Education' : [], 'Experience' : [] }; };
    var length = end - start;
    for(var i = 0; i < length; ++i) {
        gridMap.push(row());
    }

    var helper = function(yearIndex, placement, itemIndex) {
        var side = collection[itemIndex].type;
        placement = placement || 0;

        var slotValue = gridMap[yearIndex][side][placement];

        if((yearIndex + collection[itemIndex].dates.start) > collection[itemIndex].dates.end) {
            return true;
        }
        if(slotValue !== void 0 && slotValue !== null && slotValue !== -1) {
            return false;
        }

        if(helper(yearIndex + 1, placement, itemIndex)) {
            gridMap[yearIndex][side][placement] = itemIndex;
            return true;
        }

        gridMap[yearIndex][side][placement] = -1;
        return false;
    }


    for(var j = 0; j < collection.length; ++j) {
        var placed = false;
        var placementIndex = 0;
        var yearIndex = collection[j].dates.start - start;
        yearIndex = yearIndex < 0 ? 0 : yearIndex;
        while(!placed) {
            if(helper(yearIndex, placementIndex, j)) {
                placed = true;
            }
            ++placementIndex;
        }
    }

    return gridMap;
};
/* 
[]/length === endyear - startyear

[
    {
        D[]
        E[]
    }
]
 marked 
    return false
 out of years return true

var placement = 0
var foundSpot = false
while( foundSpot )
 if ( place(yearIndex + 1, placement, itemIndex) )
    mark grid;
    return;
 else
    inc placement

*/
