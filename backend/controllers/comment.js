//Imports
const models    = require('../models');
const auth = require('../middleware/auth');
const { post } = require('../routes/comment');

// Constants
const COMMENT_LIMIT   = 2;


//routes 

exports.createComment = (req, res, next) => {
  const headerAuth  = req.headers['authorization'];
  const userId      = auth.getUserId(headerAuth)

  const postId = req.params.id;

  if (postId <= 0) {
    return res.status(400).json({ 'error': 'Paramètre invalide' });
  }

  const comment = req.body.comment; 

  if (comment == null ) {
    return res.status(400).json({ 'error': 'Paramètres manquants' });
  }

  if (comment.length <= COMMENT_LIMIT) {
    return res.status(400).json({ 'error': 'Paramètres invalides' });
  }

  models.User.findOne({
    where: { id: userId }
  })
  .then(async function(user){
  
      if(user){
        let newComment = await models.Comment.create({
          userId: userId,
          postId: req.params.postId,
          userName: user.username,
          comment: comment,
        });
        return res.status(201).json({ newComment : newComment });
      } else {
        return res.status(404).json({ 'error': 'Utilisateur introuvable'})
      }

  }).catch(function (error) {
    return res.status(500).json({ error });
  });
}

exports.findAllComments = (req, res) => {

  models.Comment.findAll({
    attributes: ['PostId'],
  })
  .then(function(comments) {
    if (comments) {
      res.status(200).json({ comments : comments });
    } else {
      res.status(404).json({ "error": "no post found" });
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({ "error": err });
  });
}

exports.deleteOneComment = async (req, res) => {
  const headerAuth  = req.headers['authorization'];
  const userId      = auth.getUserId(headerAuth)

  const commentId = req.params.commentId
  if (userId <= 0){
    res.status(400).json({ 'error': 'Mauvais token' });
  }
 
  try{
    const comment = await models.Comment.findOne({ where: { id: commentId }})


    await comment.destroy()
    return res.json({ message : 'comment supprimé'})
  }catch (err) {
    return res.status(500).json({err})
  }
}

