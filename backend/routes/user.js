// Imports
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth')


//Router
router.get('/userId', userCtrl.findOneProfile);
router.get('/', auth.getAuthorization, userCtrl.findAllProfile);

router.put('/userId', multer , userCtrl.updateUserProfile);

router.delete('/userId', userCtrl.deleteOneUser)

module.exports = router;