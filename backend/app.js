// Imports
const express = require('express'); //framework
const path = require('path');

//varibales sécurité 
const helmet = require('helmet'); // sécurise les informations présentes dans le Header
const xssClean = require('xss-clean');
const cookieSession = require('cookie-session');

//Désactive la mise en cache coté client
const noCache = require('nocache');

// Variable Routes
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

// Instantiate server
const app = express();

//methode de sécurité helmet
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Cookie-session
const expiryDate = new Date( Date.now() + 60 * 60 * 1000); //1h

app.use(
  cookieSession({
    name : 'session',
    keys : ['key1', 'key2'],
    cookie: {
      secure: true, 
      //garantie que le navigateur envoie le cookie sur HTTPS
      httpOnly: true, 
      /* Garantit que le cookie n’est envoyé que sur HTTP(S), pas au JavaScript du client, 
      ce qui renforce la protection contre les attaques de type cross-site scripting. */
      domain: 'http://localhost:3000/',
      expires: expiryDate 
      //utilise une date d'expitation pour les cookies persistants
    }
  })
);

// Désactive les caches
app.use(noCache());

//Methode qui neutralise l'en-tête et empêcher les attaques ciblés 
app.disable('x-powered-by');

// Parser du JSON pour récup les paramètres dans le body de la requête
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Methode qui nettoie les entrées utili du corps POST, requêtes GET et des paramètres URL
app.use(xssClean());

// images in a static file
app.use("/images", express.static(path.join(__dirname, "images")));

//Config routes
app.use('/api/auth', loginRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);


// Export app
module.exports = app;