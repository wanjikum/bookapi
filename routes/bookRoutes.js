let express = require('express');

let route = function(Book){
    let bookRouter = express.Router();
    
    bookRouter.route("/")
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
    
        bookRouter.route("/:bookId")
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
        return bookRouter;
}

module.exports = route;