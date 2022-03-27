//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
// const { get } = require('express/lib/response');

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

// GET route (all articles)
// app.get('/articles', function(req, res) {
//     Article.find(function(err, foundAritcles) {
//         // console.log(foundAritcles);
//         if (!err) {
//             res.send(foundAritcles);
//         } else {
//             res.send(err);
//         }
//     });
// });

// CREATE a new article
// app.post('/articles', (req, res) => {
//     console.log(req.body.title);
//     console.log(req.body.content);

//     const newArticle = new Article({
//         title: req.body.title,
//         content: req.body.content
//     });
//     // create save and make function tell the server to response if something wrong
//     newArticle.save(function(err) {
//         if (!err) {
//             res.send('Succesfully added a new article.');
//         } else {
//             res.send(err);
//         }
//     });
// });

// Delete all
// app.delete('/articles', (req, res) => {
//     Article.deleteMany(function(err) {
//         if (!err) {
//             res.send('Succesfully deleted all articles.')
//         } else {
//             res.send(err);
//         }
//     });
// });

// Chained route handles using express
// Request targetting all articles
app.route('/articles')
    .get((req, res) => {
        Article.find(function(err, foundAritcles) {
            // console.log(foundAritcles);
            if (!err) {
                res.send(foundAritcles);
            } else {
                res.send(err);
            }
        });
    })
    .post((req, res) => {
        // console.log(req.body.title);
        // console.log(req.body.content);

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        // create save and make function tell the server to response if something wrong
        newArticle.save(function(err) {
            if (!err) {
                res.send('Succesfully added a new article.');
            } else {
                res.send(err);
            }
        });
    })
    .delete((req, res) => {
        Article.deleteMany(function(err) {
            if (!err) {
                res.send('Succesfully deleted all articles.')
            } else {
                res.send(err);
            }
        });
    });

// request targeting a specific article
app.route('/articles/:articleTitle')
    .get((req, res) => {
        Article.findOne({ title: req.params.articleTitle }, (err, foundArticle) => {
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send('No articles matching that article.')
            }
        });
    })
    // Update specific api route
    .put((req, res) => {
        Article.updateMany({ title: req.params.articleTitle }, { title: req.body.title, content: req.body.content }, { overwrite: true },
            function(err) {
                if (!err) {
                    res.send('Successfully updated article!');
                } else {
                    res.send(err);
                }
            }
        )
    })
    //update particular field (document)
    .patch((req, res) => {
        Article.updateMany({ title: req.params.articleTitle },
            // flag $set opertor
            { $set: req.body },
            function(err) {
                if (!err) {
                    res.send('Successfully updated');
                } else {
                    res.send(err);
                }
            }
        );
    })
    // delete particular api
    .delete((req, res) => {
        Article.deleteOne({ title: req.params.articleTitle }, (err) => {
            if (!err) {
                res.send('Successfully deleted particular article.');
            } else {
                res.send(err);
            }
        });
    });


app.listen(3000, function() {
    console.log('Server started on port 3000');
});