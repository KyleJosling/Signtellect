

var mongoose     = require('mongoose'); //requires mongoose
var Schema       = mongoose.Schema; //gets the schema

var BearSchema   = new Schema({ //creates new
    name: String
});

module.exports = mongoose.model('Bear', BearSchema);    //exports to module