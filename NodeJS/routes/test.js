var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/dum', (req, res) => res.send('Hey'));

router.post('/startTest', function (req, res) {

    var obj = req.body;
    console.log(obj.tid);

    MongoClient.connect('mongodb://localhost:27017/Emp', function (err, db) {
        if (!err) {
            var cursor = db.collection('QA').find({test_id: obj.tid});

            cursor.each(function (err, doc) {
                if (doc != null) {
                    console.log(doc);
                }
            });
        }
    });
});

module.exports = router;