
/* auteur : François Charlier HE201708 */

CREATE PROCEDURE "DBA"."get_createSondage"(in idUser integer, in question varchar(200), in idCateg char(1), in reponse1 varchar(100), in reponse2 varchar(100), 
in reponse3 varchar(100), in reponse4 varchar(100), in reponse5 varchar(100), in reponse6 varchar(100))

BEGIN
    insert into sondages
    (userId,sondTitre,categId)
    VALUES
    (idUser,question,idCateg);

    INSERT INTO reponses
    (sondId,repId,reponse)
    VALUES 
    (dba.get_sondId(),1,reponse1);
    
    INSERT INTO reponses
    (sondId,repId,reponse)
    VALUES 
    (dba.get_sondId(),2,reponse2);
    
    
    IF reponse3 !='0'  THEN 
    INSERT INTO reponses
    (sondId,repId,reponse)
    VALUES 
    (dba.get_sondId(),3,reponse3);
    END IF ;

    IF reponse4 !='0' THEN 
    INSERT INTO reponses
    (sondId,repId,reponse)
    VALUES 
    (dba.get_sondId(),4,reponse4);
    END IF ;

    IF reponse5 !='0' THEN 
    INSERT INTO reponses
    (sondId,repId,reponse)
    VALUES 
    (dba.get_sondId(),5,reponse5);
    END IF ;

    IF reponse6 !='0' THEN 
    INSERT INTO reponses
    (sondId,repId,reponse)
    VALUES 
    (dba.get_sondId(),6,reponse6);
    END IF ;
END;

----

CREATE PROCEDURE "DBA"."get_sondagesOfUser"( in param int )
result (sondId int, sondTitre varchar(200))
BEGIN 
    call sa_set_http_header('content-type', 'application:json');
    Call sa_set_http_header('Access-Control-Allow-Origin', '*');
    select dba.sondages.sondId, dba.sondages.sondTitre 
    from dba.sondages
    where sondages.userId = param
end;


---------------------------------------------------------------------------------

CREATE SERVICE "get_createSondage" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call get_createSondage(:userId,:question,:categId,:rep1,:rep2,:rep3,:rep4,:rep5,:rep6);

CREATE SERVICE "get_sondagesOfUser" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call get_sondagesOfUser(:userId);


