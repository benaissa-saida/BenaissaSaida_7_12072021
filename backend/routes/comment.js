// Imports
const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');


//Router
router.post('/:postId/comment', commentCtrl.createComment)

router.get('/:commentId', auth.getAuthorization, commentCtrl.findOneComment);
router.get('/', auth.getAuthorization, commentCtrl.findAllComment);

router.put('/:commentId', auth.getAuthorization, commentCtrl.updateOneComment);

router.delete('/:commentId', auth.getAuthorization, commentCtrl.deleteOneComment)

module.exports = router;