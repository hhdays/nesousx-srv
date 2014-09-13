var http = require('http');

var HOST = "localhost";
var PORT = 3000;

function testEnregistrerUtilisateur() {
	reponseUser = {
		"pseudo": "morgan",
		"jeSuis": "h",
		"jeRecherche": "f"
	}
	
	var reponseUserString = JSON.stringify(reponseUser);
	
	sendJson(HOST, PORT, '/test', reponseUserString);
}

function sendJson(host, port, path, jsonString) {
	headers = {
		'Content-Type': 'application/json',
		'Content-Length': jsonString.length
	};
	
	var options = {
		host: host,
		port: port,
		path: path,
		method: 'GET',
		headers: headers
	};
	
	
	var req = http.request(options, function(res) {
		res.setEncoding('utf-8');

		var responseString = '';
		res.on('data', function(data) {
			responseString += data;
		});

		res.on('end', function() {
			console.log(responseString);
			//~ var resultObject = JSON.parse(responseString);
		});
	});
	
	console.log('sending json:' + jsonString);
	
	data = {
		"callback": jsonString
	};
	
	//~ req.write(data);
	req.end();
}



testEnregistrerUtilisateur();
