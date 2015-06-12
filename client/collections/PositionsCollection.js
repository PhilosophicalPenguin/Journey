/**
 * extends a backbone collection constructor to create
 * a collection for holding PositionModels
 * @constructor
 */
var PositionsCollection = Backbone.Collection.extend({

    model : PositionModel,

    initialize: function() {
    }


});
