const express = require("express");
const router = express.Router();
const { getProducts,createProduct, updateProduct, deleteProduct, getProduct,getProductsForUser } = require('../controllers/productController');
const validateTokenHandler = require("../middleware/validateTokenHandler");

router.use(validateTokenHandler);

router.route("/").get(getProducts);

router.route("/user/").get(getProductsForUser);

router.route("/:id").get(getProduct);

router.route("/create").post(createProduct);
    
router.route("/update/:id").put(updateProduct);

router.route("/delete/:id").delete(deleteProduct);

module.exports = router;