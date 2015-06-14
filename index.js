var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var db = require('./server/db_Schemas/config');
var dataUploadRoute = require('./server/routes/dataUpload/dataUploadRoute.js');
var multipart = require('connect-multiparty');
var path = require('path');

var port = process.env.PORT || 3000;

if(process.env.PORT) {
  app.use(express.static(__dirname + '/dist'));
}
else {
 app.use(express.static(__dirname + '/client')); 
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var multipartMiddleware = multipart();

app.listen(port);
console.log('Now listening on port', port);

//post request to upload our json data scrapped from linkedin
app.post('/api/uploadfile', multipartMiddleware, dataUploadRoute.parseUploadedData);

var positionQueryRoutes   = express.Router();
var profileRoutes         = express.Router();

app.use('/api/queryPositions', positionQueryRoutes);
require('./server/routes/positionQuery/positionQueryRoutes')(positionQueryRoutes);

app.use('/api/profiles', profileRoutes);
require('./server/routes/profile/profileRoutes')(profileRoutes);

module.exports = app;
