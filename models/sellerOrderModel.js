const mongoose = require("mongoose");

const sellerOrderSchema = mongoose.Schema({
    sellerId:{
        type: String,
        required : [true,"Please add user id"],
        ref:"User"
    },
    orderItems:{
        type:Array
    },
    buyerName:{
        type:String
    },
    buyerEmail:{
        type:String
    },
    buyerContactNumber:{
        type:String
    },
    deliveryAddress:{
        type:Object
    },
    totalAmount:{
        type:Number
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("SellerOrder",sellerOrderSchema);