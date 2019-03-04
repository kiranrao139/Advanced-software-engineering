
var express = require('express');
var app = express();
var request = require('request');
var response = {};
app.get('/getVenues', function (req, res) {
    var result={
        'venue': []
    };
    console.dir("Hi");
    request('https://api.foursquare.com/v2/venues/search?client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG&v=20160215&limit=5&near=Kansas&query=pizza', function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
        }

        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        //All is good. Print the body
        body = JSON.parse(body);
        var ven = body.response.venues;
        for(var i=0;i<ven.length;i++)
        {
            result.venue.push({'name': ven[i].name,
                                'address':ven[i].location.formattedAddress.toString()});
        }
        res.contentType('application/json');
        res.write(JSON.stringify(result));
        res.end();
        response=response;
    });
    console.log(result);
})


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://root:root@ds127105.mlab.com:27105/aselabs';

var http = require("http");
var https = require("https");

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.getJSON = function(options, onResult)
{
    console.log("rest::getJSON");

    var port = options.port == 443 ? https : http;
    var req = port.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            console.dir(JSON.stringify(obj));
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {  res.write("Connecting to Database Failed");
            res.end();  }
        insertDocument(db, req.body, function() {
            res.write("Successfully logged data");
            res.end();       });    });
    var insertDocument = function(db, callback) {
        db.collection('myFirstCollection').insertOne(response, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the asedemo collection.");
            callback();
        });
    };
app.post('/get-data',function (req,res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findrestarunt(db, function() {
            db.close();        });    });
    var findrestarunt = function(db, callback) {
        var cursor =db.collection('ase').find();
        cursor.toArray(function(err, doc) {
            assert.equal(err, null);
            j=doc;
            //JSON.stringify(j);
            doc1=j;
            res.contentType('application/json');
            res.write(JSON.stringify(j));
            res.end();        });    };})
app.post('/update',function (req,res) {
    MongoClient.connect(url, function(err, db) {
        if(err)        {
            res.write("Connecting to Database Failed");
            res.end();        }
        updateDocument(db, req.body, function() {
            res.write("Successfully Registered");
            res.end();        });    });
    var id=req.body.id2;
    var item={fname:req.body.fn,lname:req.body.ln,email:req.body.ml};
    var updateDocument = function(db, data, callback) {
        db.collection('ase').updateOne({"data.response.venues[i].name"  },{$set:item}, function(err, result) {
            if(err)            {
                res.write(" Failed");
                res.end();            }
            console.log("Updated Record");
            callback();        });    };})
app.post('/delete', function(req, res) {
    var id = req.body.id1;
    MongoClient.connect(url, function(err, db) {
        if(err)        {
            res.write(" Failed");
            res.end();        }
        db.collection('myFirstCollection').deleteOne({"data.response.venues[i].name"}, function(err, result) {
            res.write("Successfully Deleted");
            res.end();
            console.log('Item deleted');        });});});

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, function() {
        db.close();
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

