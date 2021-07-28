//Imports
const bcrypt    = require('bcrypt');
const jwtUtils  = require('../utils/jwt.utils');
const models    = require('../models');
const maskData = require('maskdata');

// Constants
const emailMaskOpt = {
  maskWith: '*',
  unmaskedStartCharactersBeforeAt: 2, //laisse seulement 1 caractères non cachés avant l'@
  unmaskedEndCharactersAfterAt: 3, //laisse seulement 3 caractères non cachés après l'@
  maskAtTheRate: false,
};

const EMAIL_REGEX= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?!.*[\s])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,100}$/;


// Routes
exports.signup = function(req, res) {
  // Params
  const email    = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const bio = req.body.bio;

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
  
  models.User.findOne({
    attributes: ['email'],
    where: { email: maskData.maskEmail2(email, emailMaskOpt)}
  })
  .then(function(userFound) {
    if (!userFound) {
      bcrypt.hash(password, 10, function( err, hash ) {
        var newUser = models.User.create({
          email: maskData.maskEmail2(email, emailMaskOpt),
          username: username,
          password: hash,
          bio: bio,
          isAdmin: 0
        })
        .then(newUser =>{ res.status(201).json({ 'userId': newUser.id })
        })
        .catch(err => res.status(500).json({ 'error': 'cannot add user' }));
      });
    } else {
      return res.status(409).json({ 'error': 'user already exist' });
    }
  })
  .catch(err => res.status(500).json({ 'error': 'unable to verify user' }));
    
    
}

exports.login = (req, res) => {

  // Params
  var email    = req.body.email;
  var password = req.body.password;

  if (email == null ||  password == null) {
    return res.status(400).json({ 'error': 'missing parameters' });
  }

  // TODO verify mail regex & password length.

  models.User.findOne({
    where: { email: maskData.maskEmail2(email, emailMaskOpt) }
  })
  .then(function(userFound) {
    if (userFound) {
      bcrypt.compare(password, userFound.password, function(err, valid) {
        if(valid) {
          return res.status(200).json({
            'userId': userFound.id,
            'token': jwtUtils.generateTokenForUser(userFound)
          });
        } else {
          return res.status(403).json({ 'error': 'invalid password' });
        }
      });

    } else {
      return res.status(404).json({ 'error': 'user not exist in DB' });
    }
  })
  .catch(err => res.status(500).json({ 'error': 'unable to verify user' }));
}
 