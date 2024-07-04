const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const getProductById = asyncHandler(async (id) => {
    let product = await Product.find({ _id: id });
    return product;
});

const getProductsByIds = asyncHandler(async (ids) => {
    let products = await Product.find({ _id: ids });
    return products;
});

const calculateReviews = (stars) => {
    let deno = Object.values(stars).reduce((accum, current) => { return accum + current }, 0);
    let nomi = Object.entries(stars).reduce((accum, current) => {
        let a = accum + (parseInt(current[0]) * current[1]);
        return a;
    }, 0);
    return parseFloat((nomi / deno).toFixed(2));
};  

module.exports = { getProductById, getProductsByIds, calculateReviews };