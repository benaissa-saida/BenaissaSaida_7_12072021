// Imports
const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');


//Router
router.post('/:postId/comment', commentCtrl.createComment)

router.get('/:commentId', commentCtrl.findOneComment);
router.get('/', commentCtrl.findAllComment);

router.put('/:commentId', commentCtrl.updateOneComment);

router.delete('/:commentId', commentCtrl.deleteOneComment)

module.exports = router;