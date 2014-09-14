var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var lineReader = require('line-reader');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.set("jsonp callback", true);
app.set("jsonp callback name", "callback");

var pathDB = './db-test.sqlite';
//~ var pathQuestionsPhysiques = './q-physique.json';
//~ var pathQuestionsPhychologiques = './q-phycho.json';
var pathQuestions = './questions.json';

// suppression du fichier de la base
if (fs.exists(pathDB)) {
	fs.unlinkSync(pathDB);
}

var db = new sqlite3.Database(pathDB);

db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, pseudo TEXT, sexe TEXT, cherche TEXT)");
	db.run("CREATE TABLE IF NOT EXISTS mini (id INTEGER PRIMARY KEY AUTOINCREMENT, idUser INTEGER UNIQUE, discriminent TEXT, numAccessoires INTEGER, numBouche INTEGER, numFond INTEGER, numFront INTEGER, numJambes INTEGER, numMenton INTEGER, numNez INTEGER, numTempe INTEGER, numTete INTEGER, numYeux INTEGER, UNIQUE(idUser, discriminent))");
	db.run("CREATE TABLE IF NOT EXISTS reponse (idUser INTEGER, numQuestion INTEGER, numReponse INTEGER, PRIMARY KEY (idUser, numQuestion))");
});

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

app.get('/getListeQuestions', function(req, res) {
	console.log('getListeQuestions()');
	
	json = readQuestions(pathQuestions);
	
	envoyerReponse(res, json);
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
	
	json = readJsonReponse(req);
	
	//~ query = "select count(*) from user where pseudo = " + json.pseudo;
	//~ 
	//~ try {
		//~ db.each(query, function(err, row) {
			  //~ console.log("utilisateur "+ json.pseudo +" existe déjà en base");
			  //~ throw "utilisateur présent";
		  //~ });
	//~ } catch (e) {
		//~ console.log("utlisateur présent exception : " + e);
		//~ envoyerReponse(res, true);
		//~ return;
	//~ }
	
	var stmt = db.prepare("INSERT INTO user (pseudo, sexe, cherche) VALUES ($pseudo, $sexe, $cherche)");
	var placeholders = {
			$pseudo: json.pseudo,
			$sexe: json.sexe,
			$cherche: json.cherche
		};
	stmt.run(placeholders, function(err, row) {
			console.log(row);
			if(err) {
				envoyerReponse(res, false);
			} else {
				lastInsertedId(function(id) {
					console.log("id = " + id);
					data = {
						'id' : id,
						'questions' : readQuestions(pathQuestions)
						};
					envoyerReponse(res, data);	
				});
			}
		});
	stmt.finalize();
	
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

app.get('/mii', function(req, res) {
	console.log('mii()');
	
	resJson = afficherMimime();
	
	envoyerReponse(res, resJson);
});

function genererMinime(id) {
	console.log('afficherMimime()');
	
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
		
	return resJson;
}

app.get('/enregistrerReponses', function(req, res) {
	console.log('enregistrerReponses()');
	
	json = readJsonReponse(req);
	
	enregistrerReponses(json);
	minime = genererMinime(json.id);
	enregistrerMinime(json.id, minime);
	
	envoyerReponse(res, minime);
});

function enregistrerReponses(json) {
	json.reponses.forEach(function(item) {
		console.log(item.idQ + " : " + item.idR);
	
		var stmt = db.prepare("INSERT INTO reponse (idUser, numQuestion, numReponse) VALUES ($idUser, $numQuestion, $numReponse)");
		var placeholders = {
				$idUser: json.id,
				$numQuestion: item.idQ,
				$numReponse: item.idR
			};
		stmt.run(placeholders, function(err, row) {
			console.log(row);
			if(err) {
			} else {
				lastInsertedId(function(id) {
					console.log("id = " + id);
					data = {'id' : id};
				});
			}
		});
	});
	//~ stmt.finalize();
}

function enregistrerMinime(id, minime) {
	return enregistrerMini(id, minime, "ME");
}

function enregistrerMiniwe(id, minime) {
	return enregistrerMini(id, minime, "WE");
}

function enregistrerMini(id, minime, type) {
	console.log("enregistrerMinime() : " + id + ", " + minime);
	
	var stmt = db.prepare("insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES ($idUser, $discriminent, $numAccessoires, $numBouche, $numFond, $numFront, $numJambes, $numMenton, $numNez, $numTempe, $numTete, $numYeux)");
		var placeholders = {
				$idUser : id,
				$discriminent : type,
				$numAccessoires : minime.accessoires,
				$numBouche : minime.bouche,
				$numFond : minime.fond,
				$numFront : minime.front,
				$numJambes : minime.jambes,
				$numMenton : minime.menton,
				$numNez : minime.nez,
				$numTempe : minime.tempe,
				$numTete : minime.tete,
				$numYeux : minime.yeux
			};
		stmt.run(placeholders, function(err, row) {
			console.log(row);
			if(err) {
				console.log("enregistrerMinime : erreur lors de l'enregistrement");
			} else {
				lastInsertedId(function(id) {
					console.log("enregistrerMinime last id = " + id);
					data = {'id' : id};
				});
			}
		});
		stmt.finalize();
}

app.get('/rechercherMiniwe', function(req, res) {
	console.log('rechercherMiniwe()');
	
	json = readJsonReponse(req);
	
	console.log("id = " + json.id);
	
	query = "select miniPropo.*, userPropo.id as idpropo, userPropo.pseudo as pseudoPropo from mini miniPropo, user userSelect ";
	query += "join user userPropo ";
	query += "	on userPropo.id = miniPropo.idUser ";
	query += "join mini miniSelect ";
	query += "	on miniSelect.idUser = userSelect.id ";
	query += "where userSelect.id = " + json.id + " ";
	query += "and (userSelect.cherche = userPropo.sexe or userSelect.cherche = 'm')";
	console.log(query);
	
	var propositionsMiniwe = [];
	
	db.serialize(function() {
		db.each(query, propositionsMiniwe, function(err, row) {
			if(err) {
				console.log("rechercherMiniwe : erreur lors de la récupération des propositions de miniwe");
			}
			
			console.log("row = " + row);
			
			minimeMere = {
				"id": row.id,
				"idUser": row.idUser,
				"accessoires": row.numAccessoires,
				"bouche" : row.numBouche,
				"fond": row.numFond,
				"front" : row.numFront,
				"jambes" : row.numJambes,
				"menton" : row.numMenton,
				"nez" : row.numNez,
				"tempe" : row.numTempe,
				"tete" : row.numTete,
				"yeux" : row.numYeux
			};
			
			proposition = {
				"minimeMere": minimeMere,
				"idMere": row.idpropo,
				"idPseudo": row.pseudoPropo,
				"miniwe": genererMinime(row.idpropo)
			};
			
			propositionsMiniwe.push(proposition);
		}, function() {
			propRetournee = propositionsMiniwe[randomIntInc(0, propositionsMiniwe.length - 1)];
			console.log("la proposition retournée = " + JSON.stringify(propRetournee));
			
			envoyerReponse(res, propRetournee);
		});
	});
});

function proposerMiniwe(minime1, minime2) {
	
}

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

function lastInsertedId(callback) {
	db.each("select last_insert_rowid();", function(err, row) {
		console.log("lastInsertedId() = " + row['last_insert_rowid()']);
		callback(row['last_insert_rowid()']);
	});
}

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
