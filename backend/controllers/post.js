//Imports
const models    = require('../models');
const auth = require('../middleware/auth');
// const asyncFonc  = require('async');

//Constants
// const TITLE_LIMIT   = 2;
// const CONTENT_LIMIT = 4;
// const ITEMS_LIMIT   = 50;

//routes 

exports.createPost = (req, res) => {
    // Getting auth header
    // const headerAuth  = req.headers['authorization'];
    // const userId      = auth.getUserId(headerAuth);

    // // Params
    // const title   = req.body.title;
    // const content = req.body.content;

    // if (title == null || content == null) {
    //   return res.status(400).json({ 'error': 'missing parameters' });
    // }

    // if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
    //   return res.status(400).json({ 'error': 'invalid parameters' });
    // }
    
    // asyncFonc.waterfall([
    //   function(done) {
    //     models.User.findOne({
    //       where: { id: userId }
    //     })
    //     .then(function(userFound) {
    //       done(null, userFound);
    //     })
    //     .catch(function(err) {
    //       return res.status(500).json({ 'error': 'unable to verify user' });
    //     });
    //   },
    //   function(userFound, done) {
    //     if(userFound) {
    //       models.Post.create({
            
    //         title  : title,
    //         content: content,
    //         likes  : 0,
    //         userId : userFound.id
    //       })
    //       .then(function(newPost) {
    //         done(newPost)
    //       })
    //       .catch(error => res.status(500).json({'error': error}))
    //       console.log('userFound.id', userFound.id)
    //     } else {
    //       res.status(404).json({ 'error': 'user not found' });
    //     }
    //   },
    // ], function(newPost) {
    //   if (newPost) {
    //     return res.status(201).json(newPost);
    //   } else {
    //     return res.status(500).json({ 'error': 'cannot post message' });
    //   }
    // });

    const headerAuth  = req.headers['authorization'];
    const userId      = auth.getUserId(headerAuth);

  
      const title = req.body.title; 
      const content = req.body.content; 
      const attachement = req.body.attachement; 
  
  
      if (title == null || content == null) {
          return res.status(400).json({ 'error': 'remplir le titre et la description' });
      }
      if (title.lenght < 2 || title.lenght > 30 || content.length < 2) {
          return res.status(400).json({ 'error': ' title:[2min-30max] / content:[2min]' })
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
               attachement : attachement,
               likes : 0,
               userId : user.id,
               
               
            }) ;
            return res.status(201).json({ newPost : newPost });
            

        }else{
            res.status(404).json({ 'error': 'user not found' });
            
        }

    }).catch(function (err) {
      return res.status(500).json({ 'error': err });
    });
}

// exports.findOnePost = (req, res) => {

// }

exports.findAllPost = (req, res) => {
    // const fields  = req.query.fields;
    // const limit   = parseInt(req.query.limit);
    // const offset  = parseInt(req.query.offset);
    // const order   = req.query.order;

    // if (limit > ITEMS_LIMIT) {
    //   limit = ITEMS_LIMIT;
    // }

    models.Post.findAll()
    .then(function(posts) {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ "error": "no messages found" });
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({ "error": err });
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

