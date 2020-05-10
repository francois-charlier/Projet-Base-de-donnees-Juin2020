CREATE FUNCTION "DBA"."get_sondId" ()
returns INTEGER 
BEGIN 
    DECLARE sondageId INTEGER ;

    set sondageId =  (select max(dba.sondages.sondId) from sondages) ;
    
    RETURN sondageId
end;
