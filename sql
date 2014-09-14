delete from user;
select * from user;
select count(*) from user where pseudo = "morgan";

delete from reponse;
select * from reponse;

delete from mini;
select * from mini;


select userSelect.id, userSelect.cherche, userPropo.sexe, userPropo.id, miniPropo.id, miniSelect.* from mini miniPropo, user userSelect
join user userPropo
	on userPropo.id = miniPropo.idUser
join mini miniSelect
	on miniSelect.idUser = userSelect.id
where userSelect.id = 1
	and (userSelect.cherche = userPropo.sexe or userSelect.cherche = 'm');
	
select miniPropo.*
from mini miniPropo, user userSelect
join user userPropo 
	on userPropo.id = miniPropo.idUser 
join mini miniSelect 	
	on miniSelect.idUser = userSelect.id
where userSelect.id = 1 and (userSelect.cherche = userPropo.sexe or userSelect.cherche = 'm');

select userPropo.id as upId,
userPropo.pseudo as upPseudo,
miniPropo.id as mnpId,
miniPropo.idUser as mnpIdUser,
miniPropo.numAccessoires as mnpNumAccessoires,
miniPropo.numBouche as mnpNumBouche,
miniPropo.numFond as mnpNumFond,
miniPropo.numFront as mnpNumFront,
miniPropo.numJambes as mnpNumJambes,
miniPropo.numMenton as mnpNumMenton,
miniPropo.numNez as mnpNumNez,
miniPropo.numTempe as mnpNumTempe,
miniPropo.numTete as mnpNumTete,
miniPropo.numYeux as mnpNumYeux,
miniSelect.id as mnsId,
miniSelect.idUser as mnsIdUser,
miniSelect.numAccessoires as mnsNumAccessoires,
miniSelect.numBouche as mnsNumBouche,
miniSelect.numFond as mnsNumFond,
miniSelect.numFront as mnsNumFront,
miniSelect.numJambes as mnsNumJambes,
miniSelect.numMenton as mnsNumMenton,
miniSelect.numNez as mnsNumNez,
miniSelect.numTempe as mnsNumTempe,
miniSelect.numTete as mnsNumTete,
miniSelect.numYeux as mnsNumYeux
from mini miniPropo, user userSelect
join user userPropo 
	on userPropo.id = miniPropo.idUser 
join mini miniSelect 	
	on miniSelect.idUser = userSelect.id
where userSelect.id = 1 and (userSelect.cherche = userPropo.sexe or userSelect.cherche = 'm');



select miniPropo.*, userPropo.id as idpropo, userPropo.pseudo as pseudoPropo from mini miniPropo, user userSelect join user userPropo 	on userPropo.id = miniPropo.idUser join mini miniSelect 	on miniSelect.idUser = userSelect.id where userSelect.id = 1 and (userSelect.cherche = userPropo.sexe or userSelect.cherche = 'm')