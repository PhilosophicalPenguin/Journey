var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var db = require('./server/db_Schemas/config');
var Degree = require('./server/db_Schemas/models/degree');
var FieldOfStudy = require('./server/db_Schemas/models/fieldOfStudy');
var School = require('./server/db_Schemas/models/school');
var Position = require('./server/db_Schemas/models/position');
var Profile = require('./server/db_Schemas/models/profile');
var Industry = require('./server/db_Schemas/models/industry');
var EduMilestone = require('./server/db_Schemas/models/eduMilestone');

// var mongoose = require('mongoose')
// var db_port = process.env.MONGOLAB_URI || 'mongodb://localhost/socialstocks';
// mongoose.connect(db_port);
// require('./middleware.js')(app, express);

var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/client'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port);
console.log('Now listening on port', port);

app.get('/getStats', function(req, res){

  console.log('getStats is called', req.query.name);

  new Position().where({
    name: req.query.name
  }).fetchAll({
    withRelated: ['profiles']
  }).then(function(collection) {
    if (!collection) {
      console.log('No records for profile found.');
    } else {
      console.log('variable position:', collection);
      var position = res.json(collection);
    }
  });

});