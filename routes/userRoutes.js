const express = require("express");
const router = express.Router();
const { register,login, getUserDetails } = require('../controllers/userController');
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register",register);

router.post("/login", login);

router.get("/getUserDetails", validateToken, getUserDetails);

module.exports = router;