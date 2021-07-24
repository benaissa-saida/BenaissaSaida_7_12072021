//Imports
const models    = require('../models');
const auth = require('../middleware/auth');
const asyncFonc  = require('async');

exports.findOneProfile = (req, res) => {
    // Getting auth header
    const headerAuth  = req.headers['authorization'];
    const userId      = auth.getUserId(headerAuth);
     
    if (userId < 0){
        res.status(400).json({ 'error': 'mauvais token' });
    }

    models.User.findOne({
        attributes: [ 'id', 'email', 'bio', 'firstname', 'lastname', 'profilePhoto' ],
        where: { id: userId}
    })
    .then(user => {
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(404).json({ 'error': 'user not found' + req.params});
    }
    })
    .catch(function(err) {
        res.status(500).json({ 'error': 'cannot fetch user' + userId});
    });
}

exports.findAllProfile = (req, res) =>{
  // Getting auth header
  const headerAuth  = req.headers['authorization'];
  const userId      = auth.getUserId(headerAuth);
   
  if (userId < 0){
      res.status(400).json({ 'error': 'mauvais token' });
  }

  models.User.findAll({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  })
  .then(users => res.status(200).json(users))
  .catch(error => res.status(400).json({ error }));
}

exports.updateUserProfile = function(req, res) {
    // Getting auth header
    const headerAuth  = req.headers['authorization'];
    const userId      = auth.getUserId(headerAuth);
     
    if (userId < 0){
        res.status(400).json({ 'error': 'mauvais token' });
    }

    // Params
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const bio = req.body.bio;
    const profilePhoto = req.body.profilePhoto;


    asyncFonc.waterfall([
      function(done) {
        models.User.findOne({
          attributes: ['id', 'bio', 'firstname', 'lastname', 'profilePhoto'],
          where: { id: userId }
        }).then(function (userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          userFound.update({
            firstname: (firstname ? firstname: userFound.firstname),
            lastname: (lastname ? lastname : userFound.lastname),
            bio: (bio ? bio : userFound.bio),
            profilePhoto: (profilePhoto ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : userFound.profilePhoto),
          }).then(function() {
            done(userFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user' });
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(userFound) {
      if (userFound) {
        return res.status(201).json(userFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update user profile' });
      }
    });
}