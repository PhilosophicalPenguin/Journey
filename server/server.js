var express = require('express')
var app = express();
var bookshelf = require('./db_Schemas/bookshelf');

// var mongoose = require('mongoose')
// var db_port = process.env.MONGOLAB_URI || 'mongodb://localhost/socialstocks';
// mongoose.connect(db_port);

// require('./middleware.js')(app, express);


var port = process.env.PORT || 4000;

app.listen(port);
console.log("Now listening on port", port);