// Imports
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer');


//Router
router.get('/userId', userCtrl.findOneProfile);
router.get('/', userCtrl.findAllProfile);

router.put('/userId', multer , userCtrl.updateUserProfile);

module.exports = router;