// Imports
const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer');


//Router
router.post('/new', multer, postCtrl.createPost)

router.get('/:id', postCtrl.findOnePost);
router.get('/', postCtrl.findAllPost);

router.delete('/:postId', postCtrl.deleteOnePost)

module.exports = router;