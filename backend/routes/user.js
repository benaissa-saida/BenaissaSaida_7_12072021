// Imports
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
// const auth = require('../middleware/auth');

//Router
router.get('/userId', userCtrl.findOneProfile);
router.get('/', userCtrl.findAllProfile);

router.put('/userId', userCtrl.updateUserProfile);

module.exports = router;