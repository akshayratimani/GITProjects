var express = require('express');
var router = express.Router();
var session;
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var rnum = require('random-number');
var nodemailer = require('nodemailer');


router.get('/rand', function (req, res) {
    var options = {min: 10, max: 99, integer: true};
    var n1 = rnum(options);
    var n2 = rnum(options);

    var id = 'tid_' + n1 + n2;
    res.send("ID : ", {id});
});

router.get('/download', function (req, res) {
    console.log("getting it");
    const file = `${__dirname}/sample/sample.xlsx`;
    res.download(file);
});

router.post('/createTest', function (req, res) {


    session = req.session;
    var obj = req.body;
    console.log("obje:", obj.tname);
    //File Upload
    var fstream;
    req.pipe(req.busboy);


    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        fstream = fs.createWriteStream(__dirname + '/uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });

    //Convert xlsx to mongo data
    var mongoXlsx = require('mongo-xlsx');
    var model = mongoXlsx.buildDynamicModel([{
        "Slno": "1",
        "Question": "sample",
        "Option_1": "sam",
        "Option_2": "sam2",
        "Option_3": "sam3",
        "Option_4": "sam4",
        "Correct_answer": "sam"
    }]);
    mongoXlsx.xlsx2MongoData("./routes/uploads/sample.xlsx", model, function (err, mongoData) {
        console.log('Mongo:', mongoData);
        console.log('error', err);


        MongoClient.connect("mongodb://localhost:27017/Emp", function (err, db) {
            if (err) {
                throw err;
            }
            db.collection('QA', function (err, collection) {

                //Generating Test Id
                var options = {min: 10, max: 99, integer: true};
                var n1 = rnum(options);
                var n2 = rnum(options);
                var id = 'tid_' + n1 + n2;

                collection.insert({
                    "test_name": obj.tname,
                    "test_id": id,
                    "username": session.username,
                    "QA": mongoData
                });

                if (!err) {
                    res.render('success.html', {temp: "4"})
                }
            });
        });
    });
});


module.exports = router;