const express = require("express");
const router = express.Router();
const validateTokenHandler = require("../middleware/validateTokenHandler");
const { addToCart, getCartDetails, updateCartQuantity, deleteFromCart, validateAndFetchCoupon } = require("../controllers/commonController");

router.use(validateTokenHandler);

router.route("/addtocart").post(addToCart);
router.route("/getcart").get(getCartDetails);
router.route("/updateCartQuantity").post(updateCartQuantity);
router.route("/deleteproductfromcart").get(deleteFromCart);
router.route("/validateandfetchcoupon").get(validateAndFetchCoupon);

module.exports = router;