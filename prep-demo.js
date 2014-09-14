var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db-test.sqlite');

db.serialize(function() {
	db.run("DROP TABLE user");
	db.run("DROP TABLE mini");
	db.run("DROP TABLE reponse");
	db.run("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, pseudo TEXT, sexe TEXT, cherche TEXT)");
	db.run("CREATE TABLE IF NOT EXISTS mini (id INTEGER PRIMARY KEY AUTOINCREMENT, idUser INTEGER UNIQUE, discriminent TEXT, numAccessoires INTEGER, numBouche INTEGER, numFond INTEGER, numFront INTEGER, numJambes INTEGER, numMenton INTEGER, numNez INTEGER, numTempe INTEGER, numTete INTEGER, numYeux INTEGER, UNIQUE(idUser, discriminent))");
	db.run("CREATE TABLE IF NOT EXISTS reponse (idUser INTEGER, numQuestion INTEGER, numReponse INTEGER, PRIMARY KEY (idUser, numQuestion))");
});

users = [
	"INSERT INTO user VALUES (1, 'Raoul', 'h', 'h')",
	"INSERT INTO user VALUES (2, 'pénélope', 'f', 'h')",
	"INSERT INTO user VALUES (3, 'natachatte', 'f', 'h')",
	"INSERT INTO user VALUES (4, 'gwendoline', 'f', 'h')",
	"INSERT INTO user VALUES (5, 'jean-gilbert', 'h', 'm')",
	"INSERT INTO user VALUES (6, 'maurice', 'h', 'h')",
	"INSERT INTO user VALUES (7, 'jean-louis', 'h', 'f')",
	"INSERT INTO user VALUES (8, 'kevin', 'h', 'f')",
	"INSERT INTO user VALUES (9, 'bernadette', 'f', 'm')",
	"INSERT INTO user VALUES (10, 'amandineDu38', 'f', 'm')",
	"INSERT INTO user VALUES (11, 'nabilallokoi', 'f', 'f')",
	"INSERT INTO user VALUES (12, 'bryan', 'h', 'h')",
	"INSERT INTO user VALUES (13, 'steevie', 'h', 'h')"
];

minimes = [
	"insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES (1, 'ME', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)",
	"insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES (2, 'ME', 10, 1, 2, 3, 4, 5, 6, 7, 8, 9)",
	"insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES (3, 'ME', 9, 10, 1, 2, 3, 4, 5, 6, 7, 8)",
	"insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES (4, 'ME', 8, 9, 2, 1, 2, 3, 4, 5, 6, 7)",
	"insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES (5, 'ME', 7, 8, 1, 10, 1, 2, 3, 4, 5, 6)",
	"insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES (6, 'ME', 6, 7, 3, 9, 10, 1, 2, 3, 4, 5)",
	"insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES (7, 'ME', 5, 6, 1, 8, 9, 10, 1, 2, 3, 4)",
	"insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES (8, 'ME', 4, 5, 2, 7, 8, 9, 10, 1, 2, 3)",
	"insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES (9, 'ME', 3, 4, 3, 6, 7, 8, 9, 10, 1, 2)",
	"insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES (10, 'ME', 2, 3, 1, 5, 6, 7, 8, 9, 10, 1)",
	"insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES (11, 'ME', 1, 2, 2, 4, 5, 6, 7, 8, 9, 10)",
	"insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES (12, 'ME', 5, 6, 3, 10, 5, 7, 7, 2, 9, 10)",
	"insert into mini (idUser, discriminent, numAccessoires, numBouche, numFond, numFront, numJambes, numMenton, numNez, numTempe, numTete, numYeux) VALUES (13, 'ME', 8, 1, 1, 1, 3, 5, 7, 3, 5, 1)",
];
		
db.serialize(function() {
	users.forEach(function(item) {
		db.run(item);
	});
	
	minimes.forEach(function(item) {
		db.run(item);
	});
});
