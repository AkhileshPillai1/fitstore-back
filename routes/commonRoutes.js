const express = require("express");
const router = express.Router();
const validateTokenHandler = require("../middleware/validateTokenHandler");
const { addToCart } = require("../controllers/commonController");

router.use(validateTokenHandler);

router.route("/addtocart").post(addToCart);

module.exports = router;