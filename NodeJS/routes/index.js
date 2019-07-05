var express = require('express');
var router = express.Router();
var session;

/* GET home page. */

router.get('/home', function (req, res) {
    session = req.session;
    if (session.username) {
        console.log('Session up');
        res.render('home.html', {session: true, un: session.username})
    } else {
        console.log('session down');
        res.render('home.html', {session: false})
    }

});

router.get('/professorHome', function (req, res) {

    session = req.session;
    if (session.username) {
        res.render('proHome.html', {session: true, un: session.username})
    } else {
        console.log('session down');
        res.render('proHome.html', {session: false})
    }

});

router.get('/', () => console.log("Hello"));

router.get('/test', function (req, res) {
    res.render('index.pug');
});


module.exports = router;
