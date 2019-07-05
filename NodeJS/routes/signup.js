var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


router.get('/signup', (req, res) => res.render('signup.html'));


router.post('/signup', function (req, res) {
    var obj = req.body;
    MongoClient.connect("mongodb://localhost:27017/Emp", function (err, db) {
        if (err) {
            throw err;
        }
        db.collection('signup', function (err, collection) {
            collection.insert({name: obj.name, phno: obj.phno, username: obj.un, password: obj.pwd});
            if (err) {
                res.send('ERROR:Did not save');
            } else {
                res.send('Data Saved');
            }
        });
    });

});

module.exports = router;
