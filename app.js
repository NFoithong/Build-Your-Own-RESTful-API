//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { get } = require('express/lib/response');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded({
//     entended: true
// }));
app.use(express.static('public'));

//connection
mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true });
//db schema
const atricleSchema = {
    title: String,
    content: String
};
//article model
const Article = mongoose.model('Article', atricleSchema);
//TODO

// GET all article
app.get('/articles', function(req, res) {
    Article.find(function(err, foundAritcles) {
        // console.log(foundAritcles);
        if (!err) {
            res.send(foundAritcles);
        } else {
            res.send(err);
        }
    });
});

app.listen(3000, function() {
    console.log('Server started on port 3000');
});