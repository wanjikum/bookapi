let bookController = function(Book){
    let post = function(req, res){
        console.log("This is the req body", req.body);
        // creating a new instance of mongo
        let book = new Book(req.body); 
 
        // saves the instance into the database
        book.save();
        console.log(book);
        // send status 201 which means created
        res.status(201).send(book);
     }

     let get = function(req,res){
        let query = {};
        if(req.query.genre){
            query.genre = req.query.genre;
        }
        Book.find(query, function(err,books){
            if(err){
                return res.status(500).send(err)
            }
            else{
                res.json(books);
            }
        });
    }

    return {
        post: post,
        get:get
    }

}
module.exports = bookController;