
module.exports = {

  forEach : function() {
    var list = arguments[0]; // grab the collection
    for (var i = 0; i < list.length; i++) { // iterate over collection
      for (var j = 1; j < arguments.length; j++) { // iterate over callbacks arguments[1] .. arguments[n]

        arguments[j](list[i], i, list);
      }
    }
  }

  
};
