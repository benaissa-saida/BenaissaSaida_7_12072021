//Imports
const models    = require('../models');
const auth = require('../middleware/auth');

// Constants
const TITLE_LIMIT   = 2;
const CONTENT_LIMIT = 4;
// const ITEMS_LIMIT   = 50;

//routes 

exports.createPost = (req, res, next) => {
  const headerAuth  = req.headers['authorization'];
  const userId      = auth.getUserId(headerAuth);
  
  const title = req.body.title; 
  const content = req.body.content; 
  const attachment = req.body.attachment;

  if (title == null || content == null) {
    return res.status(400).json({ 'error': 'Paramètres manquants' });
  }

  if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
    return res.status(400).json({ 'error': 'Paramètres invalides' });
  }

  models.User.findOne({
    where: { id: userId }
  })
  .then(async function(user){
    if(user){
      let user = await models.User.findOne({ where: {id : userId} })
      let newPost = await models.Post.create({
        title : title,
        content : content,
        attachment : req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : attachment,
        likes : 0,
        UserId : user.id,
        userName: user.username,
      });
      return res.status(201).json({ newPost : newPost });
    }else{
      res.status(404).json({ 'error': 'Utilisateur introuvable' });
    }

  }).catch(function (err) {
    return res.status(500).json({ 'error': err });
  });
}

exports.findOnePost = async (req, res) => {
  const postId      = req.params.postId
   
  if (postId < 0){
      res.status(400).json({ 'error': 'paramètres invalides' });
  }
  
  models.Post.findOne({
    where: { id: postId },
  })
  .then(function(post) {
    if (post) {
      res.status(200).json({ post: post });
    } else {
      res.status(404).json({ "error": "Aucun post trouvé" });
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({ "error": err });
  });
}

exports.findAllPost = (req, res) => {
  models.Post.findAll()
  .then(function(posts) {
    if (posts) {
      res.status(200).json({ posts : posts });
    } else {
      res.status(404).json({ "error": "no post found" });
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({ "error": err });
  });
}

exports.updateOnePost = async (req, res, next) => {
  // Getting auth header
  const headerAuth  = req.headers['authorization'];
  const postId      = auth.getUserId(headerAuth);
  
  if (postId < 0){
    res.status(400).json({ 'error': 'mauvais token' });
  }
  
  // Params
  const {title, content, attachment} = req.body
 
  try{
    const post = await models.Post.findOne({ where: { id: postId }})


    post.title = title
    post.content = content
    post.attachment = attachment

    await post.save()
    return res.json({post})
  }catch (err) {
    return res.status(500).json({err})
  }
}

exports.deleteOnePost = async (req, res) => {
  const postId      = req.params.postId
  
  if (postId < 0){
    res.status(400).json({ 'error': 'Paramètres invalide' });
  }
  
 
  try{
    const post = await models.Post.findOne({ where: { id: postId }})


    await post.destroy()
    return res.json({ message : 'Post supprimé'})
  }catch (err) {
    return res.status(500).json({err})
  }
}

