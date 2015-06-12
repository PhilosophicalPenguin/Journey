/**
 * extends a backbone collection constructor to create
 * a collection for holding TimelineItemModel(s)
 * @constructor
 */
var TimelineItemsCollection = Backbone.Collection.extend({
    model : TimelineItemModel,

    initialize : function() {

    }
});
