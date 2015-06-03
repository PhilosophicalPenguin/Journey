var async = require("async");

var arr = [1, 2, 3, 4];

async.eachSeries(arr, function(person, callback){

	console.log("go over person");
	callback()

})

function testCallback(input){
	console.log(input)
}