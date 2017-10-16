var mongoose = require('mongoose');
var bookSchema = mongoose.Schema({
title:{
    type: String,
    required : true
},
created_date:{
    type: Date,
    default : Date.now
},
genre :{
    type: String,
    required : true
},
description:{
    type: String,
    required : true
}

});

var Book = module.exports = mongoose.model('Book',bookSchema);

//Get function

module.exports.GetBooks = function 
(callback,limit) {
    Book.find(callback).limit(limit);
}

module.exports.GetBookById = function 
(Id,callback) {
    Book.findById(Id,callback);
}
module.exports.AddBook = function 
(book,callback) {
    Book.create(book,callback);
}

module.exports.UpdateBook = function 
(id,book,options,callback) {
    var query = {_id : id}
    var update = {
        title : book.title,
        genre : book.genre,
        description : book.description
    }
    Book.findOneAndUpdate(query,update,options,callback);
}

module.exports.DeleteBook = function 
(id,callback) {
    var query = {_id : id}
    Book.remove(query,callback);
}