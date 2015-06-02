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
var dataUploadRoute = require('./server/routes/dataUpload/dataUploadRoute.js');
var multipart = require('connect-multiparty');
// require('require/server').mount(app);

// var mongoose = require('mongoose')
// var db_port = process.env.MONGOLAB_URI || 'mongodb://localhost/socialstocks';
// mongoose.connect(db_port);
// require('./middleware.js')(app, express);

var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/client'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var multipartMiddleware = multipart();

app.listen(port);
console.log('Now listening on port', port);

var positionQueryRoutes = express.Router();
app.use('/api/queryPositions', positionQueryRoutes);
require('./server/routes/positionQuery/positionQueryRoutes')(positionQueryRoutes);

app.post('/api/uploadfile', multipartMiddleware, dataUploadRoute.parseUploadedData)

// app.get('/getStats', function(req, res) {
//   new Position().where({
//     position_name: req.query.name
//   }).fetch().then(function(position) {
//     if (!position) {
//       console.log('No records for profile found.');
//     } else {
//       var positionID = position.attributes.id;

//       db.knex.from('eduMilestones')
//       .innerJoin('profiles', 'eduMilestones.profile_id', 'profiles.id')
//       .innerJoin('degrees', 'eduMilestones.degree_id', 'degrees.id')
//       .innerJoin('schools', 'eduMilestones.school_id', 'schools.id')
//       .innerJoin('fieldsOfStudy', 'eduMilestones.fieldOfStudy_id', 'fieldsOfStudy.id')
//       .where({position_id: positionID})
//       .then(function(data){

//         var forEach = function(){
//           var list = arguments[0];
//           for(var i=0; i<list.length; i++){
//             for(var j = 1; j < arguments.length; j++){
//               arguments[j](list[i], i, list);
//             }
//           }
//         };

//         var result = {
//           degrees: { total: 0 },
//           fieldsOfStudy: { total: 0 },
//           schools: { total: 0 },
//           degreesAndFields: { total: 0 }
//         }

//         forEach(data,
//           function(object){
//             var val = object.degree_name;
//             if(result.degrees[val]){
//               result.degrees[val]++;
//             }
//             else {
//               result.degrees[val] = 1;
//             }
//             result.degrees.total++;
//           },

//           function(object){
//             var val = object.fieldOfStudy_name;
//             if(result.fieldsOfStudy[val]){
//               result.fieldsOfStudy[val]++;
//             }
//             else {
//               result.fieldsOfStudy[val] = 1;
//             }
//             result.fieldsOfStudy.total++;
//           },

//           function(object){
//             var val = object.school_name;
//             if(result.schools[val]){
//               result.schools[val]++;
//             }
//             else {
//               result.schools[val] = 1;
//             }
//             result.schools.total++;
//           },

//           function(object){
//             var degreeName = object.degree_name.toString();
//             var schoolName = object.school_name.toString();
//             var val = degreeName + '_' + schoolName;
//             if(result.degreesAndFields[val]){
//               result.degreesAndFields[val]++;
//             }
//             else {
//               result.degreesAndFields[val] = 1;
//             }
//             result.degreesAndFields.total++;
//           }
//         );

//         res.json(result);
//       });

//       // var position = res.json(collection);
//     }
//   });

// });

module.exports = app;

  // new Position().where({
  //   name: req.query.name
  // }).fetchAll({
  //   withRelated: ['profiles']
  // }).then(function(collection) {
  //   if (!collection) {
  //     console.log('No records for profile found.');
  //   } else {
  //     console.log('variable position:', collection);
  //     var position = res.json(collection);
  //   }
  // });
