var app = new AppModel({positionsCollection: positionsCollection});
var appView = new AppView({model: app});

appView.$el.appendTo('.mainContent');
