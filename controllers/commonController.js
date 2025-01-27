const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Coupon = require("../models/couponModel");
const { getProductsByIds } = require("../services/productService")
const { clearCartService } = require("../services/cartService")

const addToCart = asyncHandler(async (req, res) => {

    const cartObject = req.body;
    if (!cartObject.productId || !cartObject.quantity) {
        res.status(400);
        throw new Error("Please enter mandatory fields");
    }
    // let user = await getUserDetails();
    const user = await User.findOne({ emailId: req.user.emailId });
    // res.json(user);
    if (user && user.cart && user.cart.length > 0) {
        if (user.cart.some(obj => obj.productId == cartObject.productId)) {
            user.cart.forEach(item => {
                if (item.productId == cartObject.productId)
                    item.quantity += cartObject.quantity;
            });
        }
        else {
            user.cart.push(cartObject);
        }
    }
    else {
        user.cart.push(cartObject);
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });// new keyword returns the updated object
    // const updatedUser = updateUser(user);
    const response = {
        success: true,
        cartItems: updatedUser
    }
    res.json(response);
});

const clearCart = asyncHandler(
    async (req, res) => {
        if (req.user && req.user.userId) {
            const updatedUser = clearCartService(req.user.userId);
            if (updatedUser)
                res.json(updatedUser);
            else {
                res.status(500);
                throw new Error("Internal server error");
            }
        }
        else{
            res.status(500);
                throw new Error("Internal server error");
        }
    }
)

const getCartDetails = asyncHandler(async (req, res) => {

    const userObject = await User.findOne({ emailId: req.user.emailId });
    let response = [];
    if (userObject && userObject.cart && userObject.cart.length > 0) {
        let products = await getProductsByIds(userObject.cart.map(obj => obj.productId));
        if (products) {
            products.forEach((p, i) => {
                response.push({
                    product: p,
                    userQuantity: userObject.cart.filter(obj => obj.productId == p._id)[0].quantity
                });
            });
        }
    }

    res.json(response);
});

const updateCartQuantity = asyncHandler(async (req, res) => {
    let updatedQuantity = req.body;
    let userObject = await User.findOne({ emailId: req.user.emailId });
    userObject.cart.forEach((item) => {
        if ((item.productId == updatedQuantity.productId)) {
            item.quantity = parseInt(updatedQuantity.userQuantity)
        }
    })

    const updatedUser = await User.findByIdAndUpdate(userObject._id, userObject, { new: true });
    res.json(updatedUser);
});

const deleteFromCart = asyncHandler(async (req, res) => {
    if (!req.query.productId) {
        res.status(400);
        throw new Error("Product id is missing");
    }
    let userObject = await User.findOne({ emailId: req.user.emailId });
    if (userObject) {
        userObject.cart = userObject.cart.filter(item => {
            if (item.productId != req.query.productId)
                return item;
        });
        const updatedUser = await User.findByIdAndUpdate(userObject._id, userObject, { new: true });
        res.json(updatedUser.cart);
    }
    else {
        res.status(500);
        throw new Error("Error in fetching user");
    }
});

const validateAndFetchCoupon = asyncHandler(async (req, res) => {
    if (!req.query.couponCode) {
        res.status(400);
        throw new Error("Coupon code is missing");
    }
    let couponObj = await Coupon.findOne({ code: req.query.couponCode });
    if (couponObj && couponObj.code) {
        res.json({
            isValid: true,
            couponData: couponObj
        });
    }
    else {
        res.json({
            isValid: false
        })
    }
});

module.exports = { addToCart, getCartDetails, updateCartQuantity, deleteFromCart, validateAndFetchCoupon, clearCart };