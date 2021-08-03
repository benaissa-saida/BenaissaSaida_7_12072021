// Imports
const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');


//Router
router.post('/:postId', commentCtrl.createComment)

router.delete('/:commentId', commentCtrl.deleteOneComment)

module.exports = router;