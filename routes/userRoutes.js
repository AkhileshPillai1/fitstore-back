const express = require("express");
const router = express.Router();
const { register,login, getUserDetails, updateUser, updateAddresses } = require('../controllers/userController');
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register",register);

router.post("/login", login);

router.get("/getUserDetails", validateToken, getUserDetails);

router.put("/update", validateToken, updateUser);

router.put("/updateaddresses", validateToken, updateAddresses);

module.exports = router;