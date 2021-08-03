//Imports
const models    = require('../models');
const auth = require('../middleware/auth');


exports.findOneProfile = (req, res) => {
    // Getting auth header
    const headerAuth  = req.headers['authorization'];
    const userId      = auth.getUserId(headerAuth);
     
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
        res.status(500).json({ 'error': 'Utilisateur impossible à créer !' });
    });
}

exports.findAllProfile = (req, res) =>{

  models.User.findAll({
    attributes: { exclude: ['email','password', 'createdAt', 'updatedAt'] },
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
  
  
  models.User.findOne({
    attributes: ['id', 'bio', 'firstname', 'lastname', 'profilePhoto'],
    where: { id: userId }
  }).then(function (userFound) {
    if(userFound) {
      userFound.update({
        firstname: (firstname ? firstname : userFound.firstname),
        lastname: (lastname ? lastname : userFound.lastname),
        bio: (bio ? bio : userFound.bio),
        profilePhoto: (profilePhoto ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : userFound.profilePhoto),
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
    res.status(400).json({ 'error': 'Paramètres invalide' });
  }
  
 
  try{
    const user = await models.User.findOne({ where: { id: userId }})


    await user.destroy()
    return res.json({ message : 'Utilisateur supprimé !'})
  }catch (err) {
    return res.status(500).json({err})
  }
}