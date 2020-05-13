"use strict";

// auteur : Matthew Everard

/*

*/


/* ************************************************* */

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


/****************************************/


function connexion(formulaire){
    let tableUsers = [];
    let pseudo = getElemId('pseudoConnexion').value;
    let motDePasse = getElemId('motdepasseConnexion').value;

    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost/get_usersTable', true);
    xhr.onload = function jsonToTable() {
        tableUsers =  JSON.parse(xhr.responseText);
        let compteur = 0;
        for (let i of tableUsers) {
            compteur++;
            if (pseudo == i.userPseudo && motDePasse== i.userPassword) {
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
