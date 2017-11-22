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
let bookRouter = require('./routes/bookRoutes')(Book);


// do an app.use and setup a base for where our API route is going to be
// Lets do a /api and then we'll pass in the router and that will take care of
// all of the routes up into app.use
//  This is a cleaner way to do our api routing
app.use('/api/books', bookRouter);
// app.use('/api/authors', authorRouter);



// get takes in the root of your site and the second parameter is a call back function
// the req is the request from the customer and res is from the responsponse
app.get('/', function(req, res){
    res.send("Welcome to my site")
});

app.listen(port, function(){
    console.log('Gulp is running on port ' + port);
});