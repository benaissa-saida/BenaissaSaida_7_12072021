//Imports
const models    = require('../models');
const auth = require('../middleware/auth');
const fs = require('fs');

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
  const attachment = req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : "";

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
        attachment : attachment,
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
  const headerAuth  = req.headers['authorization'];
  const userId      = auth.getUserId(headerAuth);
   
  if (userId< 0){
      res.status(400).json({ 'error': 'Mauvais token' });
  }
  
  await models.Post.findOne({
    attributes: ['id', 'title', 'userName', 'userId', 'content', 'attachment'],
    where: { id: req.params.id },
  })
  .then(async function(post) {
    await models.User.findOne({
      attributes: ['userName'],
      where: { id: userId }
    }).then(async function (user){
      await models.Comment.findAll({
        attributes: ['comment', 'userName','id', 'userId'],
        where: { postId: req.params.id },
      })
      .then(function (comments) {
        const getComment= { post, comments}
        res.status(200).json(getComment)
      }).catch(function(err) {
        console.log(err);
        res.status(500).json({ "error": err });
      });
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({ "error": err });
    });
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
  const userId      = auth.getUserId(headerAuth);
  
  if (userId < 0){
    res.status(400).json({ 'error': 'mauvais token' });
  }
  
  // Params
  const {title, content} = req.body
 
  try{
    const post = models.Post.findOne({ where: { id: req.params.id }})
   

    post.title = title
    post.content = content
    post.attachment = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";

    await post.save({ fields: ['title', 'content', 'attachment']})
    return res.json({post})
  }catch (err) {
    return res.status(500).json({err})
  }
}

exports.deleteOnePost = async (req, res) => {

  const postId      = req.params.p
  
  if (postId < 0){
    res.status(400).json({ 'error': 'Paramètres invalide' });
  }
  
 
  try{
    const post = await models.Post.findOne({ where: { id: postId }})
    const filename = post.attachment.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      post.destroy()
      return res.json({ message : 'Post supprimé'})
    });
  }catch (err) {
    return res.status(500).json({err})
  }
}

