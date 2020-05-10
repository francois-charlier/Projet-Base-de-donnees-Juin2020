"use strict";

// auteur : François Charlier HE201708

/*

*/

/**********************************************************/

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


/*********************************************************/


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