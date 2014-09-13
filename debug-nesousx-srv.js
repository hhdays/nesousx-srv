var http = require('http');

var HOST = "localhost";
var PORT = 3000;

function testEnregistrerUtilisateur() {
	reponseUser = {
		"test": "0"
	}
	
	var reponseUserString = JSON.stringify(reponseUser);
	
	sendJson(HOST, PORT, '/test', "_jqjsp(" + reponseUserString + ');');
}

function sendJson(host, port, path, json) {
	headers = {
		'Content-Type': 'application/json',
		'Content-Length': json.length
	};
	
	var options = {
		host: host,
		port: port,
		path: path,
		method: 'POST',
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
	
	console.log('sending json:' + json);
	
	req.write(json);
	req.end();
}



testEnregistrerUtilisateur();
