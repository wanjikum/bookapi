let should = require('should');
let sinon = require('sinon');

describe('Book controller tests:', function(){
    describe('our post test', function(){
        it("should not allow an empty title on post", function(){
             let Book = function(book){this.save = function(){}};
             let req = {
                 body: {
                     author: 'Milly'
                 }
             }

             let res = {
                 status: sinon.spy(),
                 send: sinon.spy()
             }
             let bookController = require('../controllers/bookController')(Book);
             bookController.post(req,res);
             res.status.calledWith(400).should.equal(true, 'bad status '+res.status.args[0]);
             res.send.calledWith('Title is required').should.equal(true);
             
        })
    })
})