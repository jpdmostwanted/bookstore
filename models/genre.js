var mongoose = require('mongoose');
var genreSchema = mongoose.Schema({
name:{
    type: String,
    required : true
},
created_date:{
    type: Date,
    default : Date.now
}

});

var Genre = module.exports = mongoose.model('Genre',genreSchema);

//Get function

module.exports.GetGenres = function 
(callback,limit) {
    Genre.find(callback).limit(limit);
}

module.exports.AddGenre = function 
(genre,callback) {
    Genre.create(genre,callback);
}

module.exports.UpdateGenre = function 
(id,genre,options,callback) {
    var query = {_id : id}
    var update = {
        name : genre.name
    }
    Genre.findOneAndUpdate(query,update,options,callback);
}

module.exports.DeleteGenre = function 
(id,callback) {
    var query = {_id : id}
    Genre.remove(query,callback);
}