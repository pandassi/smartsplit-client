# Assistant de création d'une oeuvre

Composante principale (oeuvre-assistant.js)

Assistant de saisie de description d'une oeuvre.

## Page 1 - Tableau de bord/embarquement (page1.js)

Lorsqu'une nouvelle oeuvre est ajoutée par l'utilisateur connecté, la progression de l'assistant n'est pas affiché.
Lorsque l'oeuvre existe déjà, la progression est affichée pour chaque étape.

Extran de cet écran :

 - Oeuvre (base)
 - Titre

Voir tâche #78

## Page 2 - Téléverser un fichier (page2.js)

Cet écran permet de transmettre un fichier audio de l'oeuvre.

Extran de cet écran :

 - Fichier* (zone de dépôt + bouton Téléverser)
 * Le fichier est déposé sur Amazon S3

 ## Page 3 - Collaborateurs (page3.js)

Cet écran permet d'ajouter des collaborateurs à l'oeuvre. D'abord soi-même, puis d'autre collaborateurs.
Chaque collaborateur est associé à un rôle et/ou à un ou plusieurs instrument.

Intran de cet écran :

 - Ayants droits
 - Arborescence des rôles et des instruments

Extrans de cet écran :

 - Collaborateurs de l'oeuvre

 ## Page 4 - Paroles (page4.js)

 Cet écran permet de saisir les paroles et la langue de l'oeuvre

 Intran de cet écran :

  - Langues

 Extran de cet écran :

  - Texte des paroles

## Page 5 - Genres de l'oeuvre (page5.js)

Cet écran permet de spécifier le ou les genres de l'oeuvre

Intran de cet écran :

 - Genres

Extran de cet écran

 - Genres de l'oeuvre

## Page 6 - Liens web (page6.js)

Cet écran permet de saisir les liens web (et médias sociaux) de l'oeuvre

Extran de cet écran

 - Liens web

 ## Page 7 - Liens commerciaux (page7.js)

Cet écran permet de saisir les liens commerciaux (achat et téléchargement) de l'oeuvre

Extran de cet écran

 - Liens commerciaux