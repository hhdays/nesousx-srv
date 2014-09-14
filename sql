delete from user;
select * from user;
select count(*) from user where pseudo = "morgan";

delete from reponse;
select * from reponse;

delete from mini;
select * from mini;


select userSelect.id, userSelect.cherche, userPropo.sexe, userPropo.id, miniPropo.id from mini miniPropo, user userSelect
join user userPropo
	on userPropo.id = miniPropo.idUser
where userSelect.id = 9
	and (userSelect.cherche = userPropo.sexe or userSelect.cherche = 'm');
	
select miniPropo.* from mini miniPropo, user userSelect join user userPropo 	on userPropo.id = miniPropo.idUser where userSelect.id = 5 and (userSelect.cherche = userPropo.sexe or userSelect.cherche = 'm');