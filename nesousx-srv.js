var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var lineReader = require('line-reader');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.set("jsonp callback", true);
app.set("jsonp callback name", "callback");

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

app.get('/test', function(req, res) {
	console.log('plop');
	
	reponse = {
			"nom": "valeur"
		}
	
	json = JSON.parse(req.query.q);
	
	console.log(json);
	console.log(JSON.stringify(json));
	
	res.jsonp(reponse);
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

app.get('/enregistrerUtilisateur', function(req, res) {
	console.log('enregistrerUtilisateur()');
	
	readJsonReponse(req.body);
	
	envoyerReponse(res, true);
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

function readJsonReponse(jsonString) {
	jsonString.replace(/^_jqjsp\(*/g, "");
	console.log(jsonString);
	json = JSON.parse(jsonString);
}

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
