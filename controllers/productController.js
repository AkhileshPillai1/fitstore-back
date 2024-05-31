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

    const product = req.body;
    if(!product.productName || !product.seller || !product.category || product.price==0){
        res.status(400);
        throw new Error("Please enter mandatory fields");
    }
    const createdProduct = await Product.create(product);
    res.json(createdProduct);
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

    if(product.userEmail.toString() != req.user.email){
        res.status(403);
        throw new Error("This action is not allowed")
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

    if(product.userEmail.toString() != req.user.email){
        res.status(403);
        throw new Error("This action is not allowed")
    }
    
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.json(deletedProduct);
});

const getProductsForUser = asyncHandler(async (req,res)=>{

    const userEmail = req.user.email;
    if(!userEmail){
        res.status(401);
        throw new Error("Please send email");
    }
    const products = await Product.find({userEmail});
    if(!products || products.length==0){
        res.status(404);
        throw new Error("No products")
    }
    res.json(products);
});

module.exports = {getProducts,createProduct,updateProduct,deleteProduct,getProduct,getProductsForUser};