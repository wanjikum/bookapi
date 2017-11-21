// start by getting a reference to mongoose and schema
let mongoose = require("mongoose");
let bookModel = mongoose.Schema({
    title: {type: String},
    author: {type: String},
    genre: {type: String},
    read:{type: Boolean, default:false}
});
module.exports = mongoose.model('book', bookModel);

