DELETE from categories;

INSERT INTO "DBA"."categories" ("categId","categName") VALUES('C','Cinéma');
INSERT INTO "DBA"."categories" ("categId","categName") VALUES('J','Jeux vidéos');
INSERT INTO "DBA"."categories" ("categId","categName") VALUES('N','Nourriture');
INSERT INTO "DBA"."categories" ("categId","categName") VALUES('P','Politique');
INSERT INTO "DBA"."categories" ("categId","categName") VALUES('S','Social');
INSERT INTO "DBA"."users" (userPseudo, userPassword, userNom, userPrenom, userDate, userMail, userSexe) VALUES  ('admin','adminsql', 'Lits', 'Maxime', '2020-10-20', 'admin@gmail.com', 'A');
