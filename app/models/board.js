

var mongoose     = require('mongoose'); //requires mongoose
var Schema       = mongoose.Schema; //gets the schema

var BoardSchema   = new Schema({ //creates new
    course: String,
    paragraph: String,
    timePosted: String
});

module.exports = mongoose.model('Board', BoardSchema);    //exports to module