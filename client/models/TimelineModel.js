var TimelineModel = Backbone.Model.extend({
  collection : TimelineItemsCollection,
  /*
    intialize : sets up all information for the time line
                based on the items passed in
  */
  initialize : function() {
    var context = this;
    console.log('identify', this);

    this.set('width', 1000);
    this.set('height', 1200);
    this.set('borderBuffer', 75);
    this.set('xMidpoint', Math.floor(this.get('width') / 2));

    this.set('oldestYear', Infinity);
    this.set('mostRecentYear', new Date().getFullYear());

    //this.get('collection').sort(TimelineItemsCollection.prototype.comparator);
    //items.sort(function(a,b) { return b.dates.start - a.dates.start; } );
    this.get('collection').forEach(function(item) { 
      //account for if this item is the oldest item
      if(item.dates.start < context.get('oldestYear')) {
        context.set('oldestYear', item.dates.start);
      } 

    });
    //incase no years where documented
    if(this.get('oldestYear') === Infinity) {
      this.set('oldestYear', 0);
    }

    this.createMainLines();
    // calculate position on the time line for each item
    this.positionTimelineItems();
  },

  yearsRange : function () {
    return this.get('mostRecentYear') - this.get('oldestYear');
  },

  createMainLines : function() {
    var midpoint = this.get('xMidpoint');
    var borderBuffer = this.get('borderBuffer');

    var topYStop = Math.floor(borderBuffer / 2);
    var capArmLength = 75;

    var topPerpendicular     = lineSegement(midpoint - capArmLength, topYStop,
                                            midpoint + capArmLength, topYStop);

    var presentEndOfTimeline = lineSegement(midpoint, topYStop,
                                            midpoint, borderBuffer);

    var pastEndOfTimeline    = lineSegement(midpoint, this.get('height') - borderBuffer, 
                                            midpoint, this.get('height'));

    var mainLine             = lineSegement(midpoint, borderBuffer,
                                            midpoint, this.get('height') - borderBuffer);

    this.set('topPerpendicular', topPerpendicular);
    this.set('presentEndOfTimeline', presentEndOfTimeline);
    this.set('pastEndOfTimeline', pastEndOfTimeline);
    this.set('mainLine', mainLine);
  },

  positionTimelineItems : function() {
    var lineLength = this.get('mainLine')[1].y - this.get('mainLine')[0].y;
    var context =  this;
    var branchLength = 75;
    this.get('collection').forEach(function (timeItem, index, timeItemsCollection) {
      var offset = branchLength;
      if(timeItem.type !== "Education") {
        offset = -offset;
      }

      var x = context.get('xMidpoint') - offset;
      var y = (lineLength * (index / timeItemsCollection.length)) + context.get('borderBuffer');
      timeItem.position = { 'x' : x, 'y' : y };
    });
  }
});

function point(x,y) {
    return { 'x' : Number(x), 'y': Number(y)};
}

function lineSegement(x1,y1,x2,y2) {
    return [point(x1,y1), point(x2,y2)];
}
