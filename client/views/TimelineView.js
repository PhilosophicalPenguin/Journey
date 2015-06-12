var TimelineView = Backbone.View.extend({
  model : TimelineModel,
  el : '#timeline-div',

  initialize : function() {
    this.height = this.model.get('height');
    this.width =  this.model.get('width');
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
    this.$el.append('<h1>Timeline</h1>');


    //create the svg for rendering the timeline too
    var svgContainer = d3.select(this.el).append('svg')
                                        .attr('width', this.width)
                                        .attr('height', this.height)
                                        .classed('timeline-svg', true);
    this.setSVG(svgContainer);

    //set the iterpolation for creating a line from a set of points
    var lineFunction = d3.svg.line()
                            .x(function(d) { return d.x; })
                            .y(function(d) { return d.y; })
                            .interpolate("linear");

    this.renderSegment(lineFunction, this.model.get('presentEndOfTimeline'));
    this.renderSegment(lineFunction, this.model.get('mainLine')); // render main line segment
    //dashed line to represent past
    this.renderSegment(lineFunction, this.model.get('pastEndOfTimeline')).style("stroke-dasharray", ("2, 2")); 


    var branchLength = 75;
    var context = this;
    //iterate over each timeline item and render it
    this.model.get('collection').forEach(function(timelineItem, index, collection) {
      var y = timelineItem.position.y;
      var x1 = context.model.get('xMidpoint');
      var x2 = timelineItem.position.x;
      var left = timelineItem.type === "Education";
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
          .attr('xlink:href', timelineItem.image)
          .attr("x", context.model.get('xMidpoint') - 16)
          .attr("y", y - 16)
          .attr("width", "32")
          .attr("height", "32");

      //create TimeBlockViews
      new TimeBlockView( { model : timelineItem, el : context.SVG.node() }, options );
    });


    return this.el;
  }
});
