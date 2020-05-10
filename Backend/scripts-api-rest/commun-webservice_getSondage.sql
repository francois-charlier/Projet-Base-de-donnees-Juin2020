CREATE PROCEDURE "DBA"."get_sondage"(in param int)
result (sondTitre varchar(200), reponse char(100), nbParticipant int, nbCheck int, userId int) 
begin
    call sa_set_http_header('content-type', 'application:json');
    Call sa_set_http_header('Access-Control-Allow-Origin', '*');
    select DBA.sondages.sondTitre,DBA.reponses.reponse, dba.sondages.nbParticipant, dba.reponses.nbCheck, dba.sondages.userId
    from dba.sondages
    NATURAL JOIN reponses
    WHERE sondages.sondId = param
end;

------------------------------------------------------
CREATE SERVICE "get_sondage" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call DBA.get_sondage(:sondId);
