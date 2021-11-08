# *Groupomania*

## Créez un réseau social d’entreprise.

-----------------------

## Mission

Construire un réseau social interne pour l'entreprise *Groupomania*.

- Authentifier un utilisateur et maintenir sa session.
- Personnaliser le contenu envoyé à un client web.
- Gérer un stockage de données à l'aide de SQL.
- Utiliser une base de données relationnelles qui se manipule avec le langage SQL.
- Les données de connexion doivent également être sécurisées. 

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
Fait avec Vue, VueX, 

```

Rendez-vous sur votre éditeur de code favoris (le mien visual studio code), ouvrez le terminal 

```
cd frontend/groupomania (dans le dossier BenaissaSaida_7_12072021)

npm install -g @vue/cli || sudo npm install -g @vue/cli (pour mac)

npm run serve 

```

***

![groupomania](https://user-images.githubusercontent.com/78473644/140793851-ae0bbd5b-f58a-429b-857d-841442c0239f.gif)


## By Benaissa Saida
