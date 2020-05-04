"use strict";

/******************************************** Variables Globales*********************************************************/

let anonyme = true;

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
        for (let i of tableUsers) {
            if (pseudo == i.userPseudo && motDePasse== i.userPassword) {
               anonyme = false;
                getElemId('connexion').hidden = true;
                getElemId('categories').hidden = false;
            }
            else {
                console.log("xouxou");
            }
        }
    };
    xhr.send();
    return false;
}

function inscription(formualire) {
    let nom = formualire.nom.value;
    let prenom = getElemId('formInscription').prenom.value;
    let pseudo = getElemId('formInscription').pseudo.value;
    let motDePasse = getElemId('formInscription').motDePasse.value;
    let adresseMail = getElemId('formInscription').adresseMail.value;
    let date = getElemId('formInscription').date.value;
    let genre = getElemId('formInscription').genre.value;

    console.log(genre);
    console.log(nom);

    return false
}

