# Projet-Base-de-donn-es-Juin2020

Idée de projet: Un site de sondages

L'idée est de s'inscrire si on ne l'est pas encore, donc il y aura un système d'inscription/connexion.
Une fois connecté, chaque utilisateur pourra créer ou participer à des sondages. Une moyenne des réponses au sondage à
la fin de celui-ci sera affichée. Au plus on répond à de sondages, au plus notre grade sera élevé.
A partir d'un certain nombre de sondages répondus, les utilisateurs pourront créer des sondage (donc à partir d'un certain grade acquis).
Chaque utilisateur aura un profil où l'on peut voir le nombre de sondages auquel il a répondu et le nombre
de sondages qu'il a créé ainsi que son grade.

Il y aura un onglet pour voir les catégories des sondages.

1) backend : Une base de données permettant de mémoriser les utilisateurs, les sondages

2) backend : Un serveur web capable de fournir les pages html, js, css, ainsi que de proposer des webservices

3) backend : Des webservices (avec les procédures associées) :
-Un webservice permettant la création et la connexion à un compte
-Un webservice permettant de récupérer les derniers sondages
-Un webservice permettant de voir le profil d'un utilisateur
-Un webservice permettant d'afficher les catégories des sondages

4) frontend : Une page web (html, js, css) permettant d'appeler les webservices et de traiter les réponses, qui propose une interface utilisateur pour:
-afficher les derniers sondages
-afficher les categories de sondages
-cliquer sur le créateur d'un sondage pour afficher son profil
-introduire ses informations d'utilisateur
-participer à un sondage
-créer/effacer un sondage
