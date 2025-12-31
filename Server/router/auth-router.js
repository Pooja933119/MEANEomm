const express = require('express');
const extractFile = require('../middleware/file');
const authController = require('../controller/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const userMiddleware = require('../middleware/user-middleware');
const router = express.Router();

router.route('/home').get(authController.home);
router.route("/register").post(extractFile,authController.register);
router.route('/login').post(extractFile,authController.login);

router.route('/admin').get(authMiddleware,adminMiddleware,authController.user);

router.route('/user').get(authMiddleware,userMiddleware,authController.user);

module.exports = router;