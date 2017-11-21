let express = require('express');
let app = express();
let mongoose = require('mongoose');

// require the body parser
let bodyParser = require('body-parser');
let port = process.env.PORT || 3000;

// specify which body parser you'll use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


let db = mongoose.connect('mongodb://localhost/bookapi', {useMongoClient: true});

let Book = require('./models/bookModel');

// Creating an instance of react router
let bookRouter = express.Router();

bookRouter.route("/books")
    .post(function(req, res){
       console.log("This is the req body", req.body);
       // creating a new instance of mongo
       let book = new Book(req.body); 

       // saves the instance into the database
       book.save();
       console.log(book);
       // send status 201 which means created
       res.status(201).send(book);
    }) 
    .get(function(req,res){
        let query = {};
        if(req.query.genre){
            query.genre = req.query.genre;
        }
        console.log(req.query);
        Book.find(query, function(err,books){
            if(err){
                return res.status(500).send(err)
            }
            else{
                res.json(books);
            }
        });
    })

    bookRouter.route("/books/:bookId")
    .get(function(req,res){
        console.log(req.params.bookId);
        Book.findById(req.params.bookId, function(err,books){
            if(err){
                return res.status(500).send(err)
            } 
            else{
                res.json(books)
            }
        });
    })

// do an app.use and setup a base for where our API route is going to be
// Lets do a /api and then we'll pass in the router and that will take care of
// all of the routes up into app.use
//  This is a cleaner way to do our api routing
app.use('/api', bookRouter);



// get takes in the root of your site and the second parameter is a call back function
// the req is the request from the customer and res is from the responsponse
app.get('/', function(req, res){
    res.send("Welcome to my site")
});

app.listen(port, function(){
    console.log('Gulp is running on port ' + port);
});