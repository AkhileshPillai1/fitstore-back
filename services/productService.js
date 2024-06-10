const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const getProductById = asyncHandler(async (id)=>{
    let product = await Product.find({_id:id});
    return product;
});

const getProductsByIds = asyncHandler(async (ids)=>{
    let products = await Product.find({_id:ids});
    return products;
});


module.exports = {getProductById,getProductsByIds};