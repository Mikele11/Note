var express = require('express');
var app = express();
//var mongojs = require('mongojs');
var bodyParser = require('body-parser');
//var db = mongojs('bookday', ['bookday']);


var db;
const MongoClient = require('mongojs').MongoClient;
const ObjectID = require('mongojs').ObjectID;

MongoClient.connect('mongodb://bookday:112358@ds153413.mlab.com:53413/bookday',function(err,db){
	if (err){
		console.log(err);
	}else{
		db = database;
		console.log('db connect');
	}
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/bookday', function (req, res) {
  console.log('All right');

  db.bookday.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  })
});

app.post('/bookday', function (req, res) {
  console.log(req.body);
  db.bookday.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/bookday/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.bookday.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/bookday/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.bookday.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/bookday/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.bookday.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, status: req.body.status, description: req.body.description}},// automatic change
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

//app.listen(3000);

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
console.log("Server running");
