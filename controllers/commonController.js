const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")

const addToCart = asyncHandler(async (req,res)=>{

    const cartObject = req.body;
    if(!cartObject.productId || !cartObject.quantity){
        res.status(400);
        throw new Error("Please enter mandatory fields");
    }
    // let user = await getUserDetails();
    const user = await User.findOne({ emailId:req.user.emailId });
    // res.json(user);
    if(user && user.cart && user.cart.length>0){
        if(user.cart.some(obj => obj.productId == cartObject.productId)){
            user.cart.forEach(item => {
                if(item.productId == cartObject.productId)
                    item.quantity+=cartObject.quantity;
            });
        }
        else{
            user.cart.push(cartObject);
        }
    }
    else{
        user.cart.push(cartObject);
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });// new keyword returns the updated object
    // const updatedUser = updateUser(user);
    res.json(updatedUser);
});

module.exports = {addToCart};