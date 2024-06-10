const express = require("express");
const router = express.Router();
const validateTokenHandler = require("../middleware/validateTokenHandler");
const { addToCart, getCartDetails } = require("../controllers/commonController");

router.use(validateTokenHandler);

router.route("/addtocart").post(addToCart);
router.route("/getcart").get(getCartDetails);

module.exports = router;