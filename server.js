var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('nodelist', ['nodelist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/nodelist', function (req, res){
	console.log('I received a GET request')

	db.nodelist.find(function (err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/nodelist', function (req, res){
	console.log(req.body);
	
	db.nodelist.insert(req.body, function (err, doc) {
		res.json(doc);
	});
});

app.delete('/nodelist/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	db.nodelist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);

	});
});

app.get('/nodelist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.nodelist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);

	});

});

app.put('/nodelist/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.nome);
	db.nodelist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {nome: req.body.nome, end: req.body.end, tel: req.body.tel, facebook: req.body.facebook, email: req.body.email, intencaodevida: req.body.intencaodevida}},
		new: true}, function (err, doc) {
			res.json(doc);
	});

});

app.listen(3000);
console.log("Server running on port 3000");