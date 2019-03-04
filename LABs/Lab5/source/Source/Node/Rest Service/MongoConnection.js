
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://<dbuser>:<dbpassword>@ds231229.mlab.com:31229/mango';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});



