const express = require("express");
const router = express.Router();
const {createOrder, getUsersOrders} = require('../controllers/orderController');
const validateTokenHandler = require("../middleware/validateTokenHandler");


router.use(validateTokenHandler);

router.route('/create').post(createOrder);
router.route('/getuserorders').get(getUsersOrders);

module.exports = router;