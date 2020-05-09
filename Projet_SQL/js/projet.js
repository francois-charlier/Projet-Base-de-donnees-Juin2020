"use strict";

/******************************************** Variables Globales*********************************************************/

let anonyme = true;

let idConnecte;

let sondageOuvert;

let idCreateur;

/******************************************** Fonctions Utiles*********************************************************/

function getElemId(param) {
    return document.getElementById(param);
}

function getElemClass(param) {
    return document.getElementsByClassName(param)
}

function goToConnexion() {
    getElemId('accueil').hidden = true;
    getElemId('connexion').hidden = false;
    getElemId('inscription').hidden = true;

    anonyme = false;
    estAnonyme();
}

function goToInscription() {
    getElemId('accueil').hidden = true;
    getElemId('inscription').hidden = false;

    estAnonyme();
}

function goToCateg() {
    getElemId('accueil').hidden = true;
    getElemId('categories').hidden = false;
    getElemId('selectCateg').hidden = true;
    getElemId('sondage').hidden = true;
    getElemId('profil').hidden = true;

    getElemId('sondageBienCree').hidden= true;

    estAnonyme();
}

function goToSelectCateg(param1,param2) {
    getSondagesOfCateg(param1);
    getElemId('categories').hidden = true;
    getElemId('selectCateg').hidden = false;

    getElemId('titreSelectCateg').innerText = param2;

    estAnonyme();
}

function goToProfil() {
    infoProfil();
    sondagesOfProfil();
    getElemId('selectCateg').hidden = true;
    getElemId('categories').hidden = true;
    getElemId('profil').hidden = false;
    getElemId('sondage').hidden = true;
    getElemId('divCreationSondage').hidden = false;

    getElemId('titreListeSondages').style.width = "";
    getElemId('titreListeSondages').style.textAlign = "";
    getElemId('titreListeSondages').style.marginLeft = "1%";
    getElemId('ascenceurSondages').style.cssFloat = "right";
    getElemId('ascenceurSondages').style.marginLeft = "";

    estAnonyme();
}

function goToSondage() {
    getElemId('selectCateg').hidden = true;
    getElemId('profil').hidden = true;
    getElemId('sondage').hidden = false;
    getElemId('validerSondage').hidden = false;
    getElemId('validerSondage').hidden = false;
    getElemId('voirResultats').hidden = true;
    getElemId('zonePourcentReponse').hidden = true;
    getElemId('zoneReponse').innerHTML = "";

    estAnonyme();
}

function estAnonyme() {
    if(anonyme) {
        let aCacher = getElemClass('photoProfilAnonyme');
        for (let i of aCacher) {
            i.hidden = true;
        }
    }
}

/******************************************** Code Général *********************************************************/

function connexion(formulaire){
    let tableUsers = [];

    let pseudo = getElemId('pseudoConnexion').value;
    let motDePasse = getElemId('motdepasseConnexion').value;

    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost/get_usersTable?secu=999', true);
    xhr.onload = function jsonToTable() {
        tableUsers =  JSON.parse(xhr.responseText);
        let compteur = 0;
        for (let i of tableUsers) {
            compteur++;
            if (pseudo == i.userPseudo && motDePasse== i.userPassword) {
               anonyme = false;
               idConnecte = i.userId;
                getElemId('connexion').hidden = true;
                getElemId('categories').hidden = false;
            }
            else if (compteur = tableUsers.length) {
                getElemId('messageErreur3').hidden=false;
            }

        }
    };
    xhr.send();
    return false;
}

function inscription(formualire) {

    let tableUsers;

    let nom = formualire.nom.value;
    let prenom = formualire.prenom.value;
    let pseudo = formualire.pseudo.value;
    let motDePasse = formualire.motDePasse.value;
    let adresseMail = formualire.adresseMail.value;
    let date = formualire.date.value;
    let genre = formualire.genre.value;

    if (motDePasse.length >= 8) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost/get_usersTable?secu=999', true);
        xhr.onload = function jsonToTable() {
            let compteur = 0;
            let check = true;
            tableUsers =  JSON.parse(xhr.responseText);
            for (let i of tableUsers) {
                compteur++;
                if (pseudo == i.userPseudo || adresseMail == i.userMail) {
                    check = false;
                    getElemId('messageErreur1').hidden= false;
                    getElemId('messageErreur2').hidden= true;
                    break;
                }

                if (check && compteur == tableUsers.length){
                    let xhr2 = new XMLHttpRequest;
                    xhr2.open('get', 'http://localhost/get_createUser?nom=' + nom + '&prenom=' + prenom + '&pseudo=' + pseudo + '&motDePasse=' + motDePasse + '&mail=' + adresseMail + '&naissance=' + date + '&sexe='+ genre, true);
                    xhr2.send();
                    formualire.nom.value = "";
                    formualire.prenom.value="";
                    formualire.pseudo.value="";
                    formualire.motDePasse.value="";
                    formualire.adresseMail.value="";
                    formualire.date.value="";
                    formualire.genre.value="M";

                    goToConnexion();
                }
            }
        };
        xhr.send();
    }
    else {
        getElemId('messageErreur2').hidden= false;
        getElemId('messageErreur1').hidden= true;
    }
    return false
}

function infoProfil() {

    let tableUsers;
    debugger;
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost/get_usersTable?secu=999', true);
    xhr.onload = function jsonToTable() {
        tableUsers =  JSON.parse(xhr.responseText);
        for (let i of tableUsers) {
            if (idConnecte == i.userId) {
                let sexe = i.userSexe;
                if (sexe = "M") {
                    sexe = "homme";
                }
                else if (sexe = "F") {
                    sexe = "femme";
                }
                else {
                    sexe = "non binaire";
                }

                getElemId('pseudo').innerText = i.userPseudo;
                getElemId('prenom').innerText = i.userPrenom;
                getElemId('nom').innerText = i.userNom;
                getElemId('mail').innerText = i.userMail;
                getElemId('date').innerText = i.userDate;
                getElemId('sexe').innerText = "Sexe : " + sexe;
                getElemId('titreListeSondages').innerText = "Voici les sondages créés par l'utilisateur " + i.userPseudo;
            }   
        }
    };
    xhr.send();
}

function nombresReponse(param) {

    debugger;
    if (param == 2) {
        getElemId('reponse1').hidden=false;
        getElemId('reponse2').hidden=false;
        getElemId('reponse3').hidden=true;
        getElemId('reponse4').hidden=true;
        getElemId('reponse5').hidden=true;
        getElemId('reponse6').hidden=true;
    }
    else if (param == 3) {
        getElemId('reponse1').hidden=false;
        getElemId('reponse2').hidden=false;
        getElemId('reponse3').hidden=false;
        getElemId('reponse4').hidden=true;
        getElemId('reponse5').hidden=true;
        getElemId('reponse6').hidden=true;
    }
    else if (param == 4) {
        getElemId('reponse1').hidden=false;
        getElemId('reponse2').hidden=false;
        getElemId('reponse3').hidden=false;
        getElemId('reponse4').hidden=false;
        getElemId('reponse5').hidden=true;
        getElemId('reponse6').hidden=true;
    }
    else if (param == 5) {
        getElemId('reponse1').hidden=false;
        getElemId('reponse2').hidden=false;
        getElemId('reponse3').hidden=false;
        getElemId('reponse4').hidden=false;
        getElemId('reponse5').hidden=false;
        getElemId('reponse6').hidden=true;
    }
    else {
        getElemId('reponse1').hidden=false;
        getElemId('reponse2').hidden=false;
        getElemId('reponse3').hidden=false;
        getElemId('reponse4').hidden=false;
        getElemId('reponse5').hidden=false;
        getElemId('reponse6').hidden=false;
    }
}

function creationSondage(formulaire) {

    if (getElemId('nbreponse').value == 3) {
        let idUser = idConnecte;
        let question = formulaire.question.value;
        let categ = formulaire.categorie.value;
        let rep1 = formulaire.rep1.value;
        let rep2 = formulaire.rep2.value;
        let rep3 = formulaire.rep3.value;
        let rep4 = '0';
        let rep5 = '0';
        let rep6 = '0';

        let xhr = new XMLHttpRequest;
        xhr.open('get', 'http://localhost/get_createSondage?userId=' + idUser + '&question=' + question + '&categId=' + categ + '&rep1=' + rep1 + '&rep2=' + rep2 + '&rep3=' + rep3 + '&rep4='+ rep4 + '&rep5=' + rep5 + '&rep6=' + rep6, true);
        xhr.send();

        formulaire.question.value = "";
        getElemId('selected').selected=true;
        nombresReponse(2);
        formulaire.rep1.value = "";
        formulaire.rep2.value = "";
        formulaire.rep3.value = "";
        getElemId('sondageBienCree').hidden= false;
    }

    else if (getElemId('nbreponse').value == 4) {
        let idUser = idConnecte;
        let question = formulaire.question.value;
        let categ = formulaire.categorie.value;
        let rep1 = formulaire.rep1.value;
        let rep2 = formulaire.rep2.value;
        let rep3 = formulaire.rep3.value;
        let rep4 = formulaire.rep4.value;
        let rep5 = '0';
        let rep6 = '0';

        let xhr = new XMLHttpRequest;
        xhr.open('get', 'http://localhost/get_createSondage?userId=' + idUser + '&question=' + question + '&categId=' + categ + '&rep1=' + rep1 + '&rep2=' + rep2 + '&rep3=' + rep3 + '&rep4='+ rep4 + '&rep5=' + rep5 + '&rep6=' + rep6, true);
        xhr.send();

        formulaire.question.value = "";
        getElemId('selected').selected=true;
        nombresReponse(2);
        formulaire.rep1.value = "";
        formulaire.rep2.value = "";
        formulaire.rep3.value = "";
        formulaire.rep4.value = "";
        getElemId('sondageBienCree').hidden= false;
    }

    else if (getElemId('nbreponse').value == 5) {
        let idUser = idConnecte;
        let question = formulaire.question.value;
        let categ = formulaire.categorie.value;
        let rep1 = formulaire.rep1.value;
        let rep2 = formulaire.rep2.value;
        let rep3 = formulaire.rep3.value;
        let rep4 = formulaire.rep4.value;
        let rep5 = formulaire.rep5.value;
        let rep6 = '0';

        let xhr = new XMLHttpRequest;
        xhr.open('get', 'http://localhost/get_createSondage?userId=' + idUser + '&question=' + question + '&categId=' + categ + '&rep1=' + rep1 + '&rep2=' + rep2 + '&rep3=' + rep3 + '&rep4='+ rep4 + '&rep5=' + rep5 + '&rep6=' + rep6, true);
        xhr.send();

        formulaire.question.value = "";
        getElemId('selected').selected=true;
        nombresReponse(2);
        formulaire.rep1.value = "";
        formulaire.rep2.value = "";
        formulaire.rep3.value = "";
        formulaire.rep4.value = "";
        formulaire.rep5.value = "";
        getElemId('sondageBienCree').hidden= false;
    }

    else if (getElemId('nbreponse').value == 6) {
        let idUser = idConnecte;
        let question = formulaire.question.value;
        let categ = formulaire.categorie.value;
        let rep1 = formulaire.rep1.value;
        let rep2 = formulaire.rep2.value;
        let rep3 = formulaire.rep3.value;
        let rep4 = formulaire.rep4.value;
        let rep5 = formulaire.rep5.value;
        let rep6 = formulaire.rep6.value;

        let xhr = new XMLHttpRequest;
        xhr.open('get', 'http://localhost/get_createSondage?userId=' + idUser + '&question=' + question + '&categId=' + categ + '&rep1=' + rep1 + '&rep2=' + rep2 + '&rep3=' + rep3 + '&rep4='+ rep4 + '&rep5=' + rep5 + '&rep6=' + rep6, true);
        xhr.send();

        formulaire.question.value = "";
        getElemId('selected').selected=true;
        nombresReponse(2);
        formulaire.rep1.value = "";
        formulaire.rep2.value = "";
        formulaire.rep3.value = "";
        formulaire.rep4.value = "";
        formulaire.rep5.value = "";
        formulaire.rep6.value = "";
        getElemId('sondageBienCree').hidden= false;
    }

    else {
        let idUser = idConnecte;
        let question = formulaire.question.value;
        let categ = formulaire.categorie.value;
        let rep1 = formulaire.rep1.value;
        let rep2 = formulaire.rep2.value;
        let rep3 = '0';
        let rep4 = '0';
        let rep5 = '0';
        let rep6 = '0';

        let xhr = new XMLHttpRequest;
        xhr.open('get', 'http://localhost/get_createSondage?userId=' + idUser + '&question=' + question + '&categId=' + categ + '&rep1=' + rep1 + '&rep2=' + rep2 + '&rep3=' + rep3 + '&rep4='+ rep4 + '&rep5=' + rep5 + '&rep6=' + rep6, true);
        xhr.send();

        formulaire.question.value = "";
        getElemId('selected').selected=true;
        nombresReponse(2);
        formulaire.rep1.value = "";
        formulaire.rep2.value = "";
        getElemId('sondageBienCree').hidden= false;
    }
    return false;
}

function getSondagesOfCateg(param) {
    let boutons = "";

    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost/get_sondages?categ=' + param, true);
    xhr.onload = function () {
        let tableau = JSON.parse(xhr.responseText);
        let compteur = 0;
        for(let i of tableau) {
            if (compteur % 2 == 0) {
                boutons += "<button onclick=\"ouvrireSondage("+ i.sondId +")\" class=\"boutonSelectCateg1\">"+ i.sondTitre +"</button><br>"
            }
            else {
                boutons += "<button onclick=\"ouvrireSondage("+ i.sondId +")\" class=\"boutonSelectCateg2\">"+ i.sondTitre +"</button><br>"
            }
            compteur++;
        }
        getElemId('boutonsSansImage').innerHTML = boutons;
    };
    xhr.send();
}

function ouvrireSondage(param) {
    sondageOuvert = param;
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost/get_sondage?sondId=' + param, true);
    xhr.onload = function () {
        let compteur = 0;
        let tds = "";
        let boutonsRep = "";
        let tableau = JSON.parse(xhr.responseText);
        let nbReponses = tableau.length;
        let largeur = (100/nbReponses) - 0.2 ;
        getElemId('titreSondage').innerText = tableau[0].sondTitre;
        getElemId('nombresParticipants').innerText = tableau[0].nbParticipant + " participant(s)";
        idCreateur = tableau[0].userId;
        for (let i of tableau) {
            compteur++;
            boutonsRep+= "<input type=\"radio\" value=\"" +compteur+ "\" class=\"boutonReponse\" name=\"reponseSondage\" required>";
            tds+= "<td class=\"reponseSondage\" width=\""+ largeur +"%\" >"+ i.reponse +"</td>";
        }
        getElemId('zoneReponse').innerHTML = tds;
        getElemId('boutonsSondage').innerHTML = boutonsRep;
        getElemId('validerSondage').onclick = function() { validerParticipation(param)};
        let largeur2 = document.querySelectorAll('#boutonsSondage input');
        for (let i of largeur2) {
            i.style.width = (100/nbReponses) - 0.1 + '%';
        }
    };
    xhr.send();
    goToSondage();
}

function validerParticipation(sondId) {
    if (getElemId('boutonsSondage').reponseSondage.value != "") {
        let reponseCheck = getElemId('boutonsSondage').reponseSondage.value;
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost/get_addCheck?sondId='+ sondId + '&repId=' + reponseCheck, true);
        xhr.send();
        let txt = getElemId('nombresParticipants').innerText;
        getElemId('nombresParticipants').innerText = Number(txt.match(/\d/g).join("")) + 1 + " participant(s)";
        getElemId('validerSondage').hidden = true;
        getElemId('voirResultats').hidden = false;
    }
}

function voirResultats() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost/get_sondage?sondId=' + sondageOuvert, true);
    xhr.onload = function afficherPourcents() {
        let tds = "";
        let tableau = JSON.parse(xhr.responseText);
        let nbReponses = tableau.length;
        let nbParticipants = tableau[0].nbParticipant;
        let largeur = (100/nbReponses) - 0.2 ;
        let calcul;
        for (let i of tableau) {
            calcul = i.nbCheck*100/nbParticipants;
            tds+= "<td class=\"reponseSondage\" width=\""+ largeur +"%\" >"+ calcul.toFixed(2) +"%</td>";
        }
        getElemId('zonePourcentReponse').innerHTML = tds;
        getElemId('zonePourcentReponse').hidden = false;
    };
    xhr.send();
}

function goToProfilCreateur() {
    let xhr = new XMLHttpRequest();
    xhr.open('get','http://localhost/get_usersTable?secu=999', true);
    xhr.onload =  function infoProfilCreateur() {
       let tableau = JSON.parse(xhr.responseText);
       for (let i of tableau) {
           if (i.userId == idCreateur) {
               let sexe = i.userSexe;
               if (sexe = "M") {
                   sexe = "homme";
               }
               else if (sexe = "F") {
                   sexe = "femme";
               }
               else {
                   sexe = "non binaire";
               }

               getElemId('pseudo').innerText = i.userPseudo;
               getElemId('prenom').innerText = i.userPrenom;
               getElemId('nom').innerText = i.userNom;
               getElemId('mail').innerText = i.userMail;
               getElemId('date').innerText = i.userDate;
               getElemId('sexe').innerText = "Sexe : " + sexe;
               getElemId('titreListeSondages').innerText = "Voici les sondages créés par l'utilisateur " + i.userPseudo;
               break;
           }
       }
        getElemId('titreListeSondages').style.width = "40%";
        getElemId('titreListeSondages').style.textAlign = "center";
        getElemId('titreListeSondages').style.marginLeft = "12%";
        getElemId('titreListeSondages').style.marginTop = "5.7%";
        getElemId('ascenceurSondages').style.cssFloat = "left";
        getElemId('ascenceurSondages').style.marginLeft = "20%";

        sondagesOfCreateur();
        getElemId('actualiserCreation').hidden = true;
        getElemId('profil').hidden = false;
        getElemId('sondage').hidden = true;
        getElemId('divCreationSondage').hidden=true;
        estAnonyme();
    };
    xhr.send();
}

function sondagesOfProfil() {
    let xhr = new XMLHttpRequest();
    xhr.open('get','http://localhost/get_sondagesOfUser?userId='+idConnecte);
    xhr.onload = function createBoutons() {
        let boutons = "";
        let tableau = JSON.parse(xhr.responseText);
        let compteur = 0;
        for(let i of tableau) {
            if (compteur % 2 == 0) {
                boutons += "<button onclick=\"ouvrireSondage("+ i.sondId +")\" class=\"listeSondagesCrées1\">"+ i.sondTitre +"</button><br>"
            }
            else {
                boutons += "<button onclick=\"ouvrireSondage("+ i.sondId +")\" class=\"listeSondagesCrées2\">"+ i.sondTitre +"</button><br>"
            }
            compteur++;
        }
        getElemId('ascenceurSondages').innerHTML = boutons;
    };
    xhr.send();
}

function sondagesOfCreateur() {
    let xhr = new XMLHttpRequest();
    xhr.open('get','http://localhost/get_sondagesOfUser?userId='+idCreateur);
    xhr.onload = function createBoutons() {
        let boutons = "";
        let tableau = JSON.parse(xhr.responseText);
        let compteur = 0;
        for(let i of tableau) {
            if (compteur % 2 == 0) {
                boutons += "<button onclick=\"ouvrireSondage("+ i.sondId +")\" class=\"listeSondagesCrées1\">"+ i.sondTitre +"</button><br>"
            }
            else {
                boutons += "<button onclick=\"ouvrireSondage("+ i.sondId +")\" class=\"listeSondagesCrées2\">"+ i.sondTitre +"</button><br>"
            }
            compteur++;
        }
        getElemId('ascenceurSondages').innerHTML = boutons;
    };
    xhr.send();
}

