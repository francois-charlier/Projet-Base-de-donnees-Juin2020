
/* auteur : Matthew Everard  */

CREATE PROCEDURE "DBA"."get_sondagesOfCateg"(in param char(1))
result (sondId int, sondTitre varchar(200))
begin
    call sa_set_http_header('content-type', 'application:json');
    Call sa_set_http_header('Access-Control-Allow-Origin', '*');
    select DBA.sondages.sondId, DBA.sondages.sondTitre
    from sondages
    WHERE categId = param
end;

----

CREATE PROCEDURE "DBA"."get_usersTable"(in param int)
result ( userId int, userPseudo varchar(200), userPassword varchar(200), userMail varchar(200), userNom char(30), userPrenom char(30), userDate date, userSexe char(1) )
BEGIN 
    
    call sa_set_http_header('content-type', 'application:json');
    Call sa_set_http_header('Access-Control-Allow-Origin', '*');
    select DBA.users.userId, DBA.users.userPseudo, DBA.users.userPassword, dba.users.userMail, DBA.users.userNom, DBA.users.userPrenom, DBA.users.userDate, DBA.users.userSexe
    from users
    WHERE param = 999
end;


---------------------------------------------------------------------

CREATE SERVICE "get_usersTable" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call get_usersTable(:secu);

CREATE SERVICE "get_sondages" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call get_sondagesOfCateg(:categ);


