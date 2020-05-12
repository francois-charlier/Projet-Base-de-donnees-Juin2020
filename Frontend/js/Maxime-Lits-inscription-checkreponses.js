"use strict";

// auteur : Maxime Lits HE201658

/*

*/

/**********************************************************/

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

/* ************************************************* */

function inscription(formualire) {

    let tableUsers;

    let nom = formualire.nom.value;
    let prenom = formualire.prenom.value;
    let pseudo = formualire.pseudo.value;
    let motDePasse = formualire.motDePasse.value;
    let confirmation = formualire.confirmation.value;
    let adresseMail = formualire.adresseMail.value;
    let date = formualire.date.value;
    let genre = formualire.genre.value;

    if (motDePasse.length >= 8 && motDePasse == confirmation) {
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


