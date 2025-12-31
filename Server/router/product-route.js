const controller = require('../controller/product-controller');
const extractFile = require('../middleware/file');
const adminMiddleware = require('../middleware/admin-middleware');
const authMiddleware = require('../middleware/auth-middleware');
const userMiddleware = require('../middleware/user-middleware');
const express = require('express');
const router = express.Router();

router.route('/create-product').post(extractFile,controller.createProduct);
router.route('/update-product/:id').put(extractFile,controller.updateProduct);
router.route('/delete-product/:id').delete(controller.deleteProduct);
router.route('/get-products').get(controller.getProducts);
router.route('/get-product/:id').get(controller.getProductById);


router.route('/create-addToCart').post(extractFile,controller.createAddToCart);
router.route('/getToProductCart').get(controller.getToProductCart);
router.route('/deleteToCart/:id').delete(controller.deleteToCart);
module.exports = router;