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

        bookRouter.use('/:bookId', function(req, res, next){

            console.log(req);
            Book.findById(req.params.bookId, function(err,book){
                if(err){
                    return res.status(500).send(err)
                }
                else if(book){
                    console.log(book);
                    req.book = book;
                    next();
                }
                else{
                    return res.status(404).send('No book found!');
                }
            });
        });
    
        bookRouter.route('/:bookId')
        .get(function(req,res){
            res.json(req.book);
        })
        .put(function(req,res){
            console.log(req.body);
            req.book.title = req.body.title;
            req.book.genre = req.body.genre;
            req.book.author = req.body.author;
            req.book.read = req.body.read;
            req.book.save(function(err){
                if(err){
                    return res.status(500).send(err)
                }
                else{
                    res.json(req.book)
                }

            });
            res.json(req.book)     
            })
        .patch(function(req,res){
            console.log(req.body);
            if(req.body._id){
                delete req.body._id;
            }
            for(let item in req.body){
                console.log(req.book[item]);
                req.book[item] = req.body[item]
            }
            req.book.save(function(err){
                if(err){
                    return res.status(500).send(err)
                }
                else{
                    res.json(req.book)
                }
            });
        })
        .delete(function(req,res){
            req.book.remove(function(err){
                if(err){
                    return res.status(500).send(err)
                }
                else{
                    res.status(204).send("REMOVED SUCCESSFULLY")
                }
            })
        });
        return bookRouter;
};

module.exports = route;