const express = require("express");
const router = express.Router();
const validateTokenHandler = require("../middleware/validateTokenHandler");
const { addToCart, getCartDetails, updateCartQuantity } = require("../controllers/commonController");

router.use(validateTokenHandler);

router.route("/addtocart").post(addToCart);
router.route("/getcart").get(getCartDetails);
router.route("/updateCartQuantity").post(updateCartQuantity);

module.exports = router;