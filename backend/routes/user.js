// Imports
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer');


//Router
router.get('/userId', userCtrl.findOneProfile);
router.get('/', userCtrl.findAllProfile);

router.put('/userId', multer , userCtrl.updateUserProfile);

router.delete('/:userId', userCtrl.deleteOneUser)

router.get('/:id', userCtrl.findFriendProfile);

module.exports = router;