// BASE SETUP
// =============================================================================

// call the packages we need


var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


var mongoose   = require('mongoose');
//mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://lab3:lab3password@ds141175.mlab.com:41175/lab3', { useMongoClient: true }); // connect to our database
//mongoose.connect('mongodb://localhost:27017/board', { useMongoClient: true }); // connect to our database

//var Bear     = require('./app/models/bear');
var Board = require('./app/models/board');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

app.use('/public', express.static(__dirname+'/public')); //get static css file

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    
    res.sendFile("index.html", {"root": __dirname+'/public'});
    console.log("root "+ __dirname+'/public');
});

// page1 route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/page1', function(req, res) {
    
    res.sendFile("page1.html", {"root": __dirname+'/public/page1'});
    console.log("root "+ __dirname+'/public/page1');
});

// more routes for our API will happen here
router.route('/board')

    // create board
    .post(function(req, res) {

        
        var board = new Board();    //new instance of board
        board.course = req.body.course;
        board.paragraph = req.body.paragraph;
        board.timePosted = req.body.timePosted;

        // save the board 
        board.save(function(err) {
            if (err)
                return res.send(err);

            res.json({ message: 'Paragraph posted!' });
        });

    })
    
    // get all boards
    .get(function(req, res) {
        Board.find(function(err, boards) {
            if (err)
                return res.send(err);

            res.json(boards);
        });
    });

router.route('/board/:board_id')

    // get the board with that id 
    .get(function(req, res) {
        Board.findById(req.params.bear_id, function(err, board) {
            if (err)
                return res.send(err);
            res.json(board);
        });
    })
    
    //put board id
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Board.findById(req.params.board_id, function(err, board) {

            if (err)
                return res.send(err);

            //updates board
            board.course = req.body.course;
            board.paragraph = req.body.paragraph;
            board.timePosted = req.body.timePosted;

            // saves the board
            board.save(function(err) {
                if (err)
                    return res.send(err);

                res.json({ message: 'Board updated!' });
            });

        });
    })
    
    // delete a board
    .delete(function(req, res) {
        Board.remove({
            _id: req.params.board_id
        }, function(err, board) {
            if (err)
                return res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
    

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


