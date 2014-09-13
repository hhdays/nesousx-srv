var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var lineReader = require('line-reader');
var express = require('express');
var app = express();

var pathDB = './nesousx.db';
var pathQuestionsPhysiques = './q-physique.json';
var pathQuestionsPhychologiques = './q-phycho.json';

// suppression du fichier de la base
if (fs.exists(pathDB)) {
	fs.unlinkSync(pathDB);
}

var db = new sqlite3.Database(pathDB);

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");
});

db.close();

app.post('/test', function(req, res) {
	console.log('plop');
	console.log(req.body.objectData);
	res.contentType('json');
	res.send({ some: 'json' });
});

app.get('/getListeQuestionsPhysiques', function(req, res) {
	console.log('getListeQuestionsPhysiques()');
	
	json = readQuestionsPhysiques();
	
	envoyerReponse(res, json);
});

app.get('/getListeQuestionsPsychologiques', function(req, res) {
	console.log('getListeQuestionsPsychologiques()');
	
	json = readQuestionsPsychologiques();
	
	envoyerReponse(res, json);
});

function envoyerReponse(res, json) {
	reponse = "_jqjsp(" + JSON.stringify(json) + ");";
	
	res.contentType('json');
	res.send(reponse);
}

function readQuestionsPhysiques() {
	return readQuestions(pathQuestionsPhysiques);
}

function readQuestionsPsychologiques() {
	return readQuestions(pathQuestionsPhychologiques);
}

function readQuestions(path) {
	return require(path);
}

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
