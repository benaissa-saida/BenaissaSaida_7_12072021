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

  const postId = req.params.postId;

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

  models.Post.findOne({
    where: { id: postId }
  })
  .then(async function(post){
    if(post){
      let user = await models.User.findOne({ where: {id : userId} })
      if(user){
        let newComment = await models.Comment.create({
          userId: user.id,
          postId: post.id,
          userName: user.username,
          comment: comment,
        });

        return res.status(201).json({ newComment : newComment });
      } else {
        return res.status(404).json({ 'error': 'Utilisateur introuvable'})
      }
    }else{
      res.status(404).json({ 'error': 'Post introuvable' });
    }

  }).catch(function (error) {
    return res.status(500).json({ error });
  });
}

exports.findOneComment = (req, res) => {
  const commentId      = req.params.commentId; 
    
  if (commentId <= 0){
    res.status(400).json({ 'error': 'Paramètres invalide' });
  }

  models.Comment.findOne({
    where: { id: commentId },
  })
  .then(function(comment) {
    if (comment) {
      res.status(200).json({ comment : comment });
    } else {
      res.status(404).json({ "error": "Aucun comment trouvé" });
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({ "error": err });
  });
}

exports.findAllComment = (req, res) => {
  models.Comment.findAll()
  .then(function(comments) {
    if (comments) {
      res.status(200).json({ comments : comments });
    } else {
      res.status(404).json({ "error": "Aucun commentaire trouvé" });
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({ "error": "Mauvais Token" });
  });
}

exports.updateOneComment = async (req, res, next) => {  

  const commentId      = req.params.commentId; 
    
  if (commentId <= 0){
    res.status(400).json({ 'error': 'Paramètres invalide' });
  }
 
  try{
    const comment = await models.Comment.findOne({ where: { id: commentId }})


    comment.comment = req.body.comment
    

    await comment.save()
    return res.json({comment})
  }catch (err) {
    return res.status(500).json({err})
  }
}

exports.deleteOneComment = async (req, res) => {
  const commentId      = req.params.commentId; 
    
  if (commentId <= 0){
    res.status(400).json({ 'error': 'Paramètres invalide' });
  }
  
 
  try{
    const comment = await models.Comment.findOne({ where: { id: commentId }})


    await comment.destroy()
    return res.json({ message : 'comment supprimé'})
  }catch (err) {
    return res.status(500).json({err})
  }
}

