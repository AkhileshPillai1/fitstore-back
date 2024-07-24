const mongoose = require("mongoose");

const userOrderSchema = mongoose.Schema({
    userId:{
        type: String,
        required : [true,"Please add user id"],
        ref:"User"
    },
    orderDetails:{
        type:Object
    },
    orderItems:{
        type:Array
    },
    deliveryAddress:{
        type:Object
    },
    status:{
        type:String
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("UserOrder",userOrderSchema);