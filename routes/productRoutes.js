const express = require("express");
const router = express.Router();
const { getProducts } = require('../controllers/productController')

router.route("/").get(getProducts);

router.route("/create").post((req,res)=>{
    res.send("Hi post");
});

module.exports = router;