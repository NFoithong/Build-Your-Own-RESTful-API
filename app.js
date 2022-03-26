//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    entended: true
}));
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

app.listen(3000, function() {
    console.log('Server started on port 3000');
});