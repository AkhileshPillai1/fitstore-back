const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getProducts = asyncHandler(async (req,res)=>{

    const products = await Product.find();
    if(!products){
        res.status(404);
        throw new Error("No products")
    }
    res.json(products);
});

const createProduct = asyncHandler(async (req,res)=>{

    console.log(req.body);
    const {productName,price} = req.body;
    if(!productName || !price){
        res.status(400);
        throw new Error("Fields are mandatory");
    }
    const product = await Product.create({
        productName,price
    })
    res.json(product);
});

const getProduct = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    res.json(product);
});

const updateProduct = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });// new keyword returns the updated object
    res.json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.json(deletedProduct);
});

module.exports = {getProducts,createProduct,updateProduct,deleteProduct,getProduct};