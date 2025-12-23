const controller = require('../controller/product-controller');
const extractFile = require('../middleware/file');

const express = require('express');
const router = express.Router();

router.route('/create-product').post(extractFile,controller.createProduct);
router.route('/update-product/:id').put(extractFile,controller.updateProduct);
router.route('/delete-product/:id').delete(controller.deleteProduct);
router.route('/get-products').get(controller.getProducts);
router.route('/get-product/:id').get(controller.getProductById);

module.exports = router;