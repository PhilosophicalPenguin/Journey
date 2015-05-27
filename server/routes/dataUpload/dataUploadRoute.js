var fs = require("fs");
var util = require('util');
// var multipart = require('connect-multiparty');
var multiparty = require('multiparty');

module.exports = {

    parseUploadedData: function(req, res) {

    var data_dump_profiles = JSON.parse(fs.readFileSync(req.files.jsondata.path, "utf8"))

    }
}
