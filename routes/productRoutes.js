const express = require("express");
const router = express.Router();
const { getProducts,createProduct, updateProduct, deleteProduct, getProduct,getProductsForUser, addReview } = require('../controllers/productController');
const validateTokenHandler = require("../middleware/validateTokenHandler");


//router.use(validateTokenHandler);

router.route("/").get(getProducts);

router.route("/user/").get(getProductsForUser);

router.route("/:id").get(getProduct);

router.route("/create").post(createProduct);
    
router.route("/update/:id").put(updateProduct);

router.route("/delete/:id").delete(deleteProduct);

router.route("/addreview").post(validateTokenHandler,addReview);

module.exports = router;