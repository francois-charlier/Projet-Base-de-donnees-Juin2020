
--------------- Procédures / fonctions de base -----------------------------------------

CREATE FUNCTION "DBA"."get_path" ()
// renvoie le chemin (path) de la racine du site (où est située la base de données)
RETURNS LONG VARCHAR 
BEGIN 
    DECLARE dbPath long VARCHAR ;
    DECLARE dbName long varchar;

    SET dbPath = (select db_property('file'));
    set dbName = (select db_property('name')) + '.db';

    set dbPath = left(dbPath, length(dbPath)-length(dbName));

    RETURN dbPath;
END;

----

CREATE PROCEDURE "DBA"."get_Page"(in param CHAR(200))
// renvoie le contenu de la page html dont le nom (SANS extension) est le paramètre url
BEGIN 

    call sa_set_http_header('content-type', 'text/html; charset=utf-8');
    select xp_read_file(get_path() || param || '.html');
END;

----

CREATE PROCEDURE "DBA"."get_js"(in url char(200))
// renvoie le contenu du script js dont le nom (+ extension) est le paramètre url
BEGIN 

    call sa_set_http_header('Content-Type', 'text/javascript'); 
    select xp_read_file(dba.get_path() || 'js\' || url);
END;

----

CREATE PROCEDURE "DBA"."get_Img"( in url char(255))
// renvoie le contenu de l image/graphique dont le nom (+ extension) est le paramètre url
BEGIN 

    call sa_set_http_header('content-type', 'image/png');
    select xp_read_file(get_path() || 'imgs\' || url);
END;

----

CREATE PROCEDURE "DBA"."get_css"( in url char(255))
// renvoie le contenu de la feuille de style dont le nom (+ extension) est le paramètre url
BEGIN 

    call sa_set_http_header('Content-Type', 'text/css');
	select xp_read_file(dba.get_path() || 'css\' || url);
END;
