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
	
	readJsonReponse(req);
	
	envoyerReponse(res, true);
});

app.get('/voirRejeton', function(req, res) {
	console.log('voirRejeton()');
	
	reqJson = readJsonReponse(req);
	
	resJson = {
		"accessoires": randomIntInc(1, 10),
		"bouche" : Math.floor((Math.random() * 10) + 1),
		"fond": Math.floor((Math.random() * 10) + 1),
		"front" : Math.floor((Math.random() * 10) + 1),
		"jambes" : Math.floor((Math.random() * 10) + 1),
		"menton" : Math.floor((Math.random() * 10) + 1),
		"nez" : Math.floor((Math.random() * 10) + 1),
		"tempe" : Math.floor((Math.random() * 10) + 1),
		"tete" : Math.floor((Math.random() * 10) + 1),
		"yeux" : Math.floor((Math.random() * 10) + 1)
		};
	
	envoyerReponse(res, resJson);
});

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function envoyerReponse(res, json) {
	console.log("envoyerReponse : " + JSON.stringify(json));
	res.jsonp(json);
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

function readJsonReponse(req) {
	console.log("readJsonReponse : " + req.query.q);
	json = JSON.parse(req.query.q);
	
	return json;
}

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
