var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var mongoose = require('mongoose');
Genres = require('./models/genre');
Books = require('./models/book');
app.use(bodyParse.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//mongoose.connect('mongodb://localhost/bookstore');
mongoose.connect('mongodb://jpdmw:cybersh0t@ds245615.mlab.com:45615/bookstore');
//var db = mongoose.connection;
//var uri = 'mongodb://@ds245615.mlab.com:45615/bookstore';

/*mongoose.createConnection(uri,
{    
User: 'jpdmw',
Password: 'cybersh0t'
});*/

var db = mongoose.connection;

app.get('/',function (req,res) {
    res.send('Hi there! Please /api/books or /api/genres');
});

app.get('/api/genres',function(req,res){
Genres.GetGenres(function (err,genres) {
    if(err){
        throw err;
    }
    res.json(genres);
    });
});

app.post('/api/genres',function(req,res){
    var genre = req.body;
    Genres.AddGenre(genre,function (err,genre) {
        if(err){
            throw err;
        }
        res.json(genre);
        });
    });

    app.put('/api/genres/:_id',function(req,res){
        var id = req.params._id;
        var genre = req.body;
        Genres.UpdateGenre(id,genre,{},function (err,genre) {
            if(err){
                throw err;
            }
            res.json(genre);
            });
        });

        app.delete('/api/genres/:_id',function(req,res){
            var id = req.params._id;
            Genres.DeleteGenre(id,function (err,genre) {
                if(err){
                    throw err;
                }
                res.json(genre);
                });
            });
    

app.get('/api/books',function(req,res){
    Books.GetBooks(function (err,books) {
        if(err){
            throw err;
        }
        res.json(books);
        });
    });


    app.post('/api/books',function(req,res){
        var book = req.body;

        Books.AddBook(book,function (err,book) {
            if(err){
                throw err;
            }
            res.json(book);
            });
        });
    
    
app.get('/api/books/:_Id',function(req,res){
    Books.GetBookById(req.params._Id,function (err,book) {
        if(err){
            throw err;
        }
        res.json(book);
        });
    });

    app.put('/api/books/:_id',function(req,res){
        var id = req.params._id;
        var book = req.body;
        Books.UpdateBook(id,book,{},function (err,book) {
            if(err){
                throw err;
            }
            
            res.json(book);
            });
        });   

        app.delete('/api/books/:_id',function(req,res){
            var id = req.params._id;
            Books.DeleteBook(id,function (err,genre) {
                if(err){
                    throw err;
                }
    
                res.json(genre);
                });
            });
        
app.listen(3000);
console.log('Running on port 3000.')