var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var sess;

//route which gives login page when requested
router.get('/login', (req, res) => res.render('login.html'));

//route which validates user.
router.post('/login', function (req, res) {
    sess = req.session;
    console.log("TEST");
    var l = "Inna bandilla";
    var obj = req.body;
    MongoClient.connect("mongodb://localhost:27017/Emp", function (err, db) {
        if (!err) {
            var cursor = db.collection('signup').find({username: obj.un, password: obj.pwd});
            cursor.each(function (err, doc) {
                if (doc != null) {
                    sess.username = obj.un;

                    if (obj.un == 'professor' && obj.pwd == 'professor') {
                        res.render('success.html', {temp: "1"});
                    } else {
                        res.render('success.html', {temp: "2"});
                    }
                } else {
                    res.render('success.html', {temp: "3"})
                    //res.render('login.html');
                }
            });
        } else {
            console.log(err);
        }
    });
});

router.get('/logout', function (req, res) {

    req.session.destroy(function (err) {
        if (err) {
            return console.log(err);
        }
        res.redirect('/home')
    });

});


module.exports = router;