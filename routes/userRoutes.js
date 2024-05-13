const express = require("express");
const router = express.Router();
const { register,login, getUserDetails } = require('../controllers/userController')

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/:id").get(getUserDetails);

module.exports = router;