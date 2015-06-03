var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var db = require('./server/db_Schemas/config');
var Degree = require('./server/db_Schemas/models/degree');
var FieldOfStudy = require('./server/db_Schemas/models/fieldOfStudy');
var School = require('./server/db_Schemas/models/school');
var Position = require('./server/db_Schemas/models/position');
var Skill = require('./server/db_Schemas/models/skill');
var Profile = require('./server/db_Schemas/models/profile');
var Industry = require('./server/db_Schemas/models/industry');
var EduMilestone = require('./server/db_Schemas/models/eduMilestone');
var ExpMilestone = require('./server/db_Schemas/models/expMilestone');
var dataUploadRoute = require('./server/routes/dataUpload/dataUploadRoute.js');
var multipart = require('connect-multiparty');

// require('require/server').mount(app);

// var mongoose = require('mongoose')
// var db_port = process.env.MONGOLAB_URI || 'mongodb://localhost/socialstocks';
// mongoose.connect(db_port);
// require('./middleware.js')(app, express);

var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/client'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var multipartMiddleware = multipart();

app.listen(port);
console.log('Now listening on port', port);

//post request to upload our json data scrapped from linkedin 
app.post('/api/uploadfile', multipartMiddleware, dataUploadRoute.parseUploadedData)

var positionQueryRoutes = express.Router();
app.use('/api/queryPositions', positionQueryRoutes);
require('./server/routes/positionQuery/positionQueryRoutes')(positionQueryRoutes);

module.exports = app;
