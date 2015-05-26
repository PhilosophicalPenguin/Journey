var labelToIdStorage = {
    degrees: {},
    fieldsOfStudy: {},
    schools: {},
    positions: {},
    industries: {},

    //methods
    getId: function(table, label){
      if(this[table].hasOwnProperty(label)){
        return this[table][label];
      }
      else {
        return -1;
      }
    },

    addItem: function(table, label, id){
        this[table][label] = id;
    }
};

//labelToIdStorage.getId('degree', 'nameOfDegree')
//labelToIdStorage.add('degree', 'nameOFDegree', id)

module.exports = labelToIdStorage;