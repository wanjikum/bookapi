let should = require('should');
let request = require('supertest');
let app = require('../app');
let mongoose = require('mongoose');
let Book = mongoose.model('book');
let agent = request.agent(app);

describe('Book crud Test', function(){
    it("should allow a book to be posted and return a read and _id", function(done){
        let BookPost = {title:'I am well', author:'John', genre:'Fiction'}; 
        agent.post('/api/books')
            .send(BookPost)
            .expect(200)
            .end(function(err, results){
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            })
    })

    afterEach(function(done){
        Book.remove().exec(); 
        done();
    })
})