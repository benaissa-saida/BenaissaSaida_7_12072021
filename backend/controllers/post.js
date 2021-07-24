//Imports
const models    = require('../models');
const auth = require('../middleware/auth');
const asyncFonc  = require('async');

//Constants
const TITLE_LIMIT   = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT   = 50;

//routes 

exports.createPost = (req, res) => {
    // Getting auth header
    const headerAuth  = req.headers['authorization'];
    const userId      = auth.getUserId(headerAuth);

    // Params
    const title   = req.body.title;
    const content = req.body.content;

    if (title == null || content == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
      return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncFonc.waterfall([
      function(done) {
        models.User.findOne({
          where: { id: userId }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
         models.Post.create({
            title  : title,
            content: content,
            likes  : 0,
            User_id : userFound.id
          })
          .then(function(newPost) {
            done(newPost);
          })
          .catch(function(error) {
            res.status(500).json({ 'error': error})});
            console.log('userId', userId)
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(newPost) {
      if (newPost) {
        return res.status(201).json(newPost);
      } else {
        return res.status(500).json({ 'error': 'cannot post message' });
      }
    });
}

// exports.findOnePost = (req, res) => {

// }

exports.findAllPost = (req, res) => {
    const fields  = req.query.fields;
    const limit   = parseInt(req.query.limit);
    const offset  = parseInt(req.query.offset);
    const order   = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.Post.findAll({
      order: [(order != null) ? order.split(':') : ['title', 'ASC']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.User,
        attributes: [ 'username' ]
      }]
    }).then(function(posts) {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ "error": "no messages found" });
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({ "error": "invalid fields" });
    });
}

// exports.updateOnePost = (req, res, next) => {
//     const postObject = req.file ? {
//         ...JSON.parse(req.body.postId), 
//         attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : {
//         ...req.body
//     };
//     models.Post.update({id: req.params.id}, {...postObject, id: req.params.id})
//     .then(() => res.status(200).json({ message: 'Post modifié !'}))
//     .catch(error => res.status(400).json({ error }))

// }

// exports.deleteOnePost = (req, res) => {

// }

