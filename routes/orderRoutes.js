const express = require("express");
const router = express.Router();
const {createOrder} = require('../controllers/orderController');
const validateTokenHandler = require("../middleware/validateTokenHandler");


router.use(validateTokenHandler);

router.route('/create').post(createOrder);

module.exports = router;