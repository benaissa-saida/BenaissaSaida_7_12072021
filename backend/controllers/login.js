//Imports
const bcrypt    = require('bcrypt');
const jwtUtils  = require('../utils/jwt.utils');
const models    = require('../models');
const asyncFonc = require('async');

// Constants
const EMAIL_REGEX= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?!.*[\s])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,100}$/;


// Routes
exports.signup = function(req, res) {

    // Params
    const email    = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if (email == null || username == null || password == null) {
      return res.status(400).json({ 'error': 'paramètres manquants' });
    }

    if (username.length >= 13 || username.length <= 4){
        return res.status(400).json({'error': 'Mauvais username (doit faire entre 5-12 lettres)'});
    }

    if (!EMAIL_REGEX.test(email)){
        return res.status(400).json({'error': 'email est pas valide'});
    }

    if (!PASSWORD_REGEX.test(password)){
        return res.status(400).json({'error': 'mot de passe invalide (doit comprendre une majuscule, une minuscule, un chiffre, et un caractère spécial. Il doit être compris entre 8-100 caractères.)'});
    }


    asyncFonc.waterfall([ //exécute des fonctions en cascade
        function(done) { //aucun argument entré
          models.User.findOne({ //Vérif si utilisateur dans bdd
            attributes: ['email'],
            where: { email: email }
          })
          .then(function(userFound) { 
            done(null, userFound); //callback (null => passe à autre fonc) + param utile fonc suivante
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'Utilisateur impossible à vérifier' });
          });
        },
        function(userFound, done) {
          if (!userFound) { // verif si user n'existe pas
            bcrypt.hash(password, 5, function( err, bcryptedPassword ) { //bcrypt pour hash mdp
              done(null, userFound, bcryptedPassword); //callback (null => passe à autre fonc) + param utile fonc suivante
            });
          } else { // sinon err user existe
            return res.status(409).json({ 'error': 'Utilisateur existant' });
          }
        },
        function(userFound, bcryptedPassword, done) { //arguments précisé précédemment
          var newUser = models.User.create({ //creation new user
            email: email,
            username: username,
            password: bcryptedPassword,
            bio: bio,
            isAdmin: 0
          })
          .then(function(newUser) {
            done(newUser); // seul paramètre dont on a besoin puisque waterfall terminé
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'Utilisateur impossible à ajouter' });
          });
        }
      ], function(newUser) {
        if (newUser) { //si new user existe
          return res.status(201).json({
            'userId': newUser.id // statut correctement créer
          });
        } else {
          return res.status(500).json({ 'error': 'Utilisateur impossible à ajouter' });
        }
      });

}

exports.login = function(req, res) {

    // Params
    const email    = req.body.email;
    const password = req.body.password;

    if (email == null ||  password == null) {
      return res.status(400).json({ 'error': 'paramètres manquants' });
    }

    asyncFonc.waterfall([
        function(done) {
          models.User.findOne({
            where: { email: email }
          })
          .then(function(userFound) {
            done(null, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'Utilisateur impossible à vérifier ' });
          });
        },
        function(userFound, done) {
          if (userFound) {
            bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
              done(null, userFound, resBycrypt);
            });
          } else {
            return res.status(404).json({ 'error': 'Utilisateur inexistant dans la bdd' });
          }
        },
        function(userFound, resBycrypt, done) {
          if(resBycrypt) {
            done(userFound);
          } else {
            return res.status(403).json({ 'error': 'Mot de passe invalide' });
          }
        }
      ], function(userFound) {
        if (userFound) {
          return res.status(201).json({
            'userId': userFound.id,
            'token': jwtUtils.generateTokenForUser(userFound)
          });
        } else {
          return res.status(500).json({ 'error': 'Impossible de se connecter' });
        }
    });
}
