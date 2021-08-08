# Groupomania

## Créez un réseau social d’entreprise.

-----------------

## Mission

Construire un réseau social interne pour l'entreprise *Groupomania*.

* Personnaliser le contenu envoyé à un client web.
* Authentifier un utilisateur et maintenir sa session.
* Gérer un stockage de données à l'aide de SQL.
* Implémenter un stockage de données sécurisé en utilisant SQL.


***

## Pour lancer le backend 

```
Fait avec DATABSE: MySQL, ORM: SEQUELIZE, LOGICIEL: NodeJS, FRAMEWORK: Express

```

### 1. Utiliser le terminal pour effectuer ces opérations 

```
/Applications/MAMP/Library/bin/mysql -u root -p (Utiliser Mamp pour une installation du serveur plus facile, ainsi que Workbench pour une meilleure gestion visuelle)

cd backend (Après être entré dans le dossier BenaissaSaida_7_12072021)

npm install --save sequelize 

npm install mysql2

```

### 2. Paramétrer .env 

Créer un fichier .env en suivant l'exemple dans le dossier backend, retourner ensuite dans le terminal 

```
sequelize db:create

sequelize db:migrate

```

La base de donnée sera opérationnelle.

### 3. Démarrer le backend

```
npm install -g nodemon || sudo npm install -g nodemon (sur mac)

nodemon server.js

```

Le backend lancé, il faudra s'attaquer au front

## Lancer le frontend

```
Fait avec Vue

```

Rendez-vous sur votre éditeur de code favoris (le mien visual studio code), ouvrez le terminal 

```
cd frontend/groupomania (dans le dossier BenaissaSaida_7_12072021)

npm install -g @vue/cli || sudo npm install -g @vue/cli (pour mac)

npm run serve 

```

## By Benaissa Saida