/**
 * Created by mnpw3d on 20/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://data:data@ds231229.mlab.com:31229/mango';
//var url = 'mongodb://marmik:2621@ds051923.mlab.com:51923/demo';
var insertDocument = function(db, callback) {
    db.collection('search').insertOne( {
        "fname" : "kiran",
        "lname" : "boinapally",

            "city":"Kansas City",

          "userid":"kiranrao",
     "phonenum":"8165419566"
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the kiranrao collection.");
        callback();
    });
};
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, function() {
        db.close();
    });
});