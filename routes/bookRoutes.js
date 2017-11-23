let express = require('express');
let route = function(Book){
    let bookRouter = express.Router();
    let bookController = require('../controllers/bookController')(Book);
 
    bookRouter.route("/")
        .post(bookController.post) 
        .get(bookController.get)

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
            let returnBook = req.book.toJSON();
            returnBook.links = {};
            let newLink = 'http://' + req.headers.host + '/api/books/?' + returnBook.genre;
            returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnBook);
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