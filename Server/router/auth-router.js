const express = require('express');
const extractFile = require('../middleware/file');
const authController = require('../controller/auth-controller');
const router = express.Router();

router.route('/home').get(authController.home);
router.route("/register").post(extractFile,authController.register);
router.route('/login').post(extractFile,authController.login);

module.exports = router;