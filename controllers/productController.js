const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { calculateReviews } = require("../services/productService");

const getProducts = asyncHandler(async (req, res) => {
    let payload = {};
    if(req.query.category && req.query.category != 0){
        payload.category = req.query.category
    }
    const products = await Product.find(payload);
    if (!products) {
        res.status(404);
        throw new Error("No products")
    }
    res.json(products);
});

const createProduct = asyncHandler(async (req, res) => {

    const product = req.body;
    if (!product.productName || !product.seller || !product.category || product.price == 0) {
        res.status(400);
        throw new Error("Please enter mandatory fields");
    }
    const duplicateProduct = await Product.find({ seller: product.seller, productCode: product.productCode });
    if (duplicateProduct.length != 0) {
        res.status(409);
        throw new Error("Please enter a unique product code!");
    }
    const createdProduct = await Product.create(product);
    res.json(createdProduct);
});

const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (product.userEmail.toString() != req.user.email) {
        res.status(403);
        throw new Error("This action is not allowed")
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });// new keyword returns the updated object
    res.json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(500);
        throw new Error("Product not found");
    }

    if (product.userEmail.toString() != req.user.email) {
        res.status(403);
        throw new Error("This action is not allowed")
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.json(deletedProduct);
});

const getProductsForUser = asyncHandler(async (req, res) => {

    const userEmail = req.user.email;
    if (!userEmail) {
        res.status(401);
        throw new Error("Please send email");
    }
    const products = await Product.find({ userEmail });
    if (!products || products.length == 0) {
        res.status(404);
        throw new Error("No products")
    }
    res.json(products);
});

const addReview = asyncHandler(async (req, res) => {

    if (!req.query.productId || !req.user.userId) {
        res.status(400);
        throw new Error("Please enter user id and product id");
    }
    const product = await Product.findById(req.query.productId);
    if (product) {
        req.body.userId = req.user.userId;
        req.body.name = req.user.fullName;
        req.body.commentDate = new Date();
        product.reviews.push(req.body);
        product.stars[req.body.stars]++;
        product.rating = calculateReviews(product.stars);
        const updatedProduct = await Product.findByIdAndUpdate(req.query.productId, product, { new: true });
        res.json({ success: true, updatedProduct: updatedProduct });
    }
    else {
        res.status(500);
        throw new Error("Product not found");
    }
});

// const calculateReviews = asyncHandler(async (req,res)=>{

//     const products = await Product.find();
//     products.forEach(async (p)=>{
//         let deno = Object.values(p.stars).reduce((accum,current)=>{return accum+current},0);
//         let nomi = Object.entries(p.stars).reduce((accum,current)=>{
//             let a = accum+(parseInt(current[0])*current[1]);
//             return a;
//         },0);
//         p.rating = parseFloat((nomi/deno).toFixed(2));
//         const updatedProduct = await Product.findByIdAndUpdate(p._id, p, { new: true });
//     })
// });

module.exports = { getProducts, createProduct, updateProduct, deleteProduct, getProduct, getProductsForUser, addReview };