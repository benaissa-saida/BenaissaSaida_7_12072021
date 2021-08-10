//Imports
const models    = require('../models');
const auth      = require('../middleware/auth');
const fs        = require('fs');

exports.findOneProfile = (req, res) => {
    // Getting auth header
    const headerAuth  = req.headers['authorization']; 
    /* vérifie si le token est valide et du coup 
    de récupérer l'id de l'utilisateur */
    const userId      = auth.getUserId(headerAuth);
    /* on fait appel à l'auth en passant en paramètre 
    l'entête d'authorisation */
     
    if (userId < 0){
        res.status(400).json({ 'error': 'mauvais token' });
    }

    models.User.findOne({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        where: { id: userId}
    })
    .then(user => {
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(404).json({ 'error': 'Utilisateur introuvable !'});
    }
    })
    .catch(function(err) {
        res.status(500).json({ 'error': 'Utilisateur impossible à trouver dans la BDD !' });
    });
}

exports.findFriendProfile = (req, res) => {
  const userId = req.params.id
   
  if (userId < 0){
      res.status(400).json({ 'error': 'paramètres invalides' });
  }

  models.User.findOne({
    attributes: ['id', 'firstname', 'lastname', 'username', 'bio', 'profilePhoto'],
      where: { id: userId}
  })
  .then(user => {
  if (user) {
      res.status(201).json(user);
  } else {
      res.status(404).json({ 'error': 'Utilisateur introuvable !'});
  }
  })
  .catch(function(err) {
      res.status(500).json({ 'error': 'Utilisateur impossible à trouver dans la BDD !' });
  });
}

exports.findAllProfile = (req, res) =>{

  models.User.findAll({
    attributes: { exclude: ['email','password', 'createdAt', 'updatedAt'] },
  })
  .then(users => res.status(200).json(users))
  .catch(error => res.status(400).json({ error }));
}

exports.updateUserProfile = async function(req, res) {
  // Getting auth header
  const headerAuth  = req.headers['authorization'];
  const userId      = auth.getUserId(headerAuth);
  
  if (userId < 0){
      res.status(400).json({ 'error': 'mauvais token' });
  }
  
  // Params
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const bio = req.body.bio;
  
  
  await models.User.findOne({
    attributes: ['id', 'bio', 'firstname', 'lastname', 'profilePhoto'],
    where: { id: userId }
  }).then(async function (userFound) {
    if(userFound) {
      await userFound.update({
        firstname: (firstname ? firstname : userFound.firstname),
        lastname: (lastname ? lastname : userFound.lastname),
        username: (username ? username : userFound.username),
        bio: (bio ? bio : userFound.bio),
        profilePhoto: (req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : userFound.profilePhoto),
      }).then(function() {
        res.status(200).json({ message: 'Utilisateur mis à jour !'})
      }).catch( error => {
        res.status(500).json({ error });
      });
    } else {
      res.status(404).json({ 'error': 'Utilisateur introuvable !' });
    }
  })
  .catch( error => {
    res.status(500).json({ error });
  });   
}

exports.deleteOneUser = async (req, res) => {
   const userId      = req.params.userId
 
   if (userId < 0){
     res.status(400).json({ 'error': 'paramètre invalide' });
   }
 
 
   try{
    const user = await models.User.findOne({ where: { id: userId }})
    if (user.profilePhoto !== null){
      const filename = user.profilePhoto.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        user.destroy()
        return res.json({ message : 'Utilisateur supprimé'})
      })
    } else{
      user.destroy()
      return res.json({ message : 'Utilisateur supprimé'})
    }
    
  }catch (err) {
    
    return res.status(500).json({err})
    
  }
}