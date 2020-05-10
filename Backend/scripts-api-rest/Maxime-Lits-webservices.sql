
/* auteur : Maxime Lits HE201658 */

CREATE PROCEDURE "DBA"."get_addCheck"(in idSond int, in idRep int)
BEGIN 
    update reponses 
    set nbCheck = nbCheck + 1
    WHERE dba.reponses.sondId = idSond and dba.reponses.repId = idRep;
    UPDATE sondages
    set nbParticipant = nbParticipant + 1
    where dba.sondages.sondId = idSond
end;

----

CREATE PROCEDURE "DBA"."get_createUser" ( in nom varchar(30), in prenom varchar(30), in pseudo varchar(30), in motDePasse varchar(30),
in mail varchar(100), in naissance date, in sexe char(1) )
BEGIN 
    insert into users 
    ( userPseudo, userPassword, userNom, userPrenom, userDate, userMail, userSexe ) 
    VALUES 
    ( pseudo, motDePasse, nom, prenom, naissance, mail, sexe );
end;

------------------------------------------------------------------------

CREATE SERVICE "get_addCheck" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call get_addCheck(:sondId,:repId);

CREATE SERVICE "get_createUser" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call get_createUser(:nom,:prenom,:pseudo,:motDePasse,:mail,:naissance,:sexe);
