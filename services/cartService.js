const User = require("../models/userModel");

const clearCart = async (userId) => {
    const userObject = await User.findOne({ _id: userId });
        if (userObject && userObject.cart && userObject.cart.length > 0) {
            userObject.cart = [];
            const updatedUser = await User.findByIdAndUpdate(userObject._id, userObject, { new: true });
            return {
                updatedUser
            }
        }
};

module.exports = { clearCart };