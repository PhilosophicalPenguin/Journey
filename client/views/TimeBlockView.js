var TimeBlockView = Backbone.View.extend({
    model : TimelineItemModel,

    initialize : function(model, options) {
        this.options = options;

        this.padding = 10;

        this.fontSize = Number(this.options.font_size.slice(0,2));
        
        var heightToWidthRatio = 0.50;

        this.width = Math.max(this.model.text['1'].length, this.model.text['2'].length, 11);
        this.width = this.width * (this.fontSize * heightToWidthRatio) + this.padding * 2;

        this.height = this.fontSize * 3 + this.padding * 2;

        
        if(this.options.leftOfTimeline) {
            this.options.cellX -= 20;
        }

        this.render();
    },

    renderCell : function () {
        var x = this.options.cellX;
        var y = this.options.cellY - this.fontSize;
        var color = 'aliceblue';
        if(this.model.type === 'Education') {
            color = 'navajowhite';
        }

        var rect = d3.select(this.el)
                      .append('rect')
                          .attr('x', x)
                          .attr('y', y)
                          .attr('rx', 15)
                          .attr('ry', 15)
                          .attr('width', this.width)
                          .attr('height', this.height)
                          .attr('id', 'timeBlock' + this.options.orderPosition)
                          .classed('timeBlock', true)
                          .attr('stroke', 'black')
                          .attr('stroke-width', 2)
                          .attr('fill', color);
    },

    renderText : function(x, y, text) {
        var svgContainer = d3.select(this.el);
        
        return svgContainer
            .append('text')
            .attr('x', x + this.padding)
            .attr('y', y-this.fontSize+3)
            .text(text)
            .attr('font-family', 'sans-serif')
            .attr('font-size', this.options.font_size)
            .attr('fill', 'black');
    },

    render : function () {
        // this.renderCell();
        //transform date information into a string
        var dates = this.model.dates;
        //render a single year if start and end are equal else "STARTYEAR - ENDYEAR"
        var strDates = dates.start.toString();
        var currentYear = new Date().getFullYear();
        if(dates.end === currentYear) {
            dates.end = 'present';
        }

        if(dates.start !== dates.end) {
            strDates += ' - ' + dates.end;
        }

        var textLine1 = this.model.text['1'];
        var textLine2 = this.model.text['2'];
        
        var x = this.options.cellX;
        var y = this.options.cellY;
        var line_0 = this.renderText(x, y,                     strDates)
                        .attr('font-style', 'italic');
        var line_1 = this.renderText(x, y + this.fontSize,     textLine1)
                        .attr('font-weight', 'bold');
        var line_2 = this.renderText(x, y + this.fontSize * 2, textLine2);
        if(this.model.type === 'Education') {
            line_0.attr('text-anchor','end');
            line_1.attr('text-anchor','end');
            line_2.attr('text-anchor','end');
        }
        // render the text
    }
});
