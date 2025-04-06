const express = require('express');
const router = express.Router();



const productController = require('../controllers/ProductController');

router.get("/find_Product", productController.findProduct);
router.post("/create_Product", productController.createProduct);
router.get("/get_Product/:id", productController.getProduct);
router.get("/get_Product_names", productController.getAllProductNames);
router.get("/compare_Products/:id1/:id2", productController.compareProducts);


module.exports = router;