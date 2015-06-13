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
            .attr('stroke', '#002B5E')
            .attr('stroke-width', 1)
            .attr('fill', 'none');
  },

  renderHeaders : function() {
    var y = this.model.get('borderBuffer');
    var x = this.model.get('xMidpoint');

    this.SVG
      .append('text')
      .attr('x', x-172)
      .attr('y', y-60)
      .text('Education')
      .attr('font-family', 'sans-serif')
      .attr('font-weight', 'bold')
      .attr('font-size', '1.5em')
      .attr('fill', 'black')

    this.SVG
      .append('text')
      .attr('x', x+100)
      .attr('y', y-60)
      .text('Experience')
      .attr('font-family', 'sans-serif')
      .attr('font-weight', 'bold')
      .attr('font-size', '1.5em')
      .attr('fill', 'black')

  },

  render : function() {
    this.$el.children().detach(); // clear the div of a previous elements
    
    //create the svg for rendering the timeline too
    var svgContainer = d3.select(this.el).append('svg')
                                        .attr('width', this.width)
                                        .attr('height', this.height)
                                        .classed('timeline-svg', true);
    this.setSVG(svgContainer);

    this.renderHeaders();
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
          font_size      : '14px',
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
