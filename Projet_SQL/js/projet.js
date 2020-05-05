"use strict";

/******************************************** Variables Globales*********************************************************/

let anonyme = true;

let idConnecté;

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

    estAnonyme();
}

function goToSelectCateg(param) {
    getElemId('categories').hidden = true;
    getElemId('selectCateg').hidden = false;

    getElemId('titreSelectCateg').innerText = param;

    estAnonyme();
}

function goToProfil() {
    infoProfil();
    getElemId('selectCateg').hidden = true;
    getElemId('categories').hidden = true;
    getElemId('profil').hidden = false;
    getElemId('sondage').hidden = true;

    estAnonyme();
}

function goToSondage() {
    getElemId('selectCateg').hidden = true;
    getElemId('sondage').hidden = false;

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
    xhr.open('get', 'http://localhost/usersTable?param=999', true);
    xhr.onload = function jsonToTable() {
        tableUsers =  JSON.parse(xhr.responseText);
        let compteur = 0;
        for (let i of tableUsers) {
            compteur++;
            if (pseudo == i.userPseudo && motDePasse== i.userPassword) {
               anonyme = false;
               idConnecté = i.userId;
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
        xhr.open('get', 'http://localhost/usersTable?param=999', true);
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
                    xhr2.open('get', 'http://localhost/createUser?nom=' + nom + '&prenom=' + prenom + '&pseudo=' + pseudo + '&motDePasse=' + motDePasse + '&mail=' + adresseMail + '&naissance=' + date + '&sexe='+ genre, true);
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
    xhr.open('get', 'http://localhost/usersTable?param=999', true);
    xhr.onload = function jsonToTable() {
        tableUsers =  JSON.parse(xhr.responseText);
        for (let i of tableUsers) {
            if (idConnecté == i.userId) {
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
    let question = formulaire.question.value;
    let categ = formulaire.categorie.value;
    let rep1 = formulaire.rep1.value;
    let rep2 = formulaire.rep2.value;
    let rep3 = formulaire.rep3.value;
    let rep4 = formulaire.rep4.value;
    let rep5 = formulaire.rep5.value;
    let rep6 = formulaire.rep6.value;
}





