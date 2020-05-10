CREATE TABLE "DBA"."users" (
	"userId" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"userPseudo" VARCHAR(30) NOT NULL,
	"userPassword" VARCHAR(30) NOT NULL,
	"userNom" VARCHAR(30) NOT NULL,
	"userPrenom" VARCHAR(30) NOT NULL,
	"userDate" DATE NOT NULL,
	"userMail" VARCHAR(100) NOT NULL,
	"userSexe" VARCHAR(1) NOT NULL DEFAULT 'F',
	CONSTRAINT "pk_users" PRIMARY KEY ( "userId" ASC )
) IN "system";

----

CREATE TABLE "DBA"."categories" (
	"categId" CHAR(1) NOT NULL DEFAULT 'J',
	"categName" VARCHAR(30) NOT NULL,
	CONSTRAINT "pk_categories" PRIMARY KEY ( "categId" ASC )
) IN "system";

----

CREATE TABLE "DBA"."sondages" (
	"sondId" INTEGER NOT NULL DEFAULT AUTOINCREMENT,
	"userId" INTEGER NULL,
	"sondTitre" VARCHAR(200) NOT NULL,
	"nbParticipant" INTEGER NOT NULL DEFAULT 0,
	"categId" CHAR(1) NULL,
	CONSTRAINT "pk_sondages" PRIMARY KEY ( "sondId" ASC ),
	CONSTRAINT "fk_sondages_categories" FOREIGN KEY ( "categId" ASC ) REFERENCES "DBA"."categories" ( "categId" ),
	CONSTRAINT "fk_sondages_users" FOREIGN KEY ( "userId" ASC ) REFERENCES "DBA"."users" ( "userId" )
) IN "system";

----

CREATE TABLE "DBA"."reponses" (
	"sondId" INTEGER NOT NULL,
	"repId" INTEGER NOT NULL,
	"reponse" VARCHAR(100) NULL,
	"nbCheck" INTEGER NOT NULL DEFAULT 0,
	CONSTRAINT "pk_reponses" PRIMARY KEY ( "sondId" ASC, "repId" ASC ),
	CONSTRAINT "fk_sondages" NOT NULL FOREIGN KEY ( "sondId" ASC ) REFERENCES "DBA"."sondages" ( "sondId" )
) IN "system";



