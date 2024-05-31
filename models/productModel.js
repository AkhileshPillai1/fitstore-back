const mongoose = require("mongoose");

//schema and validation for Products
const productSchema = mongoose.Schema({
    productCode:{
        type: String
    },
    productName:{
        type: String,
        required : [true,"Please add product name"]
    },
    description:{
        type: String,
        required : [true,"Please add description"]
    },
    stars:{
        type: Object
    },
    reviews:{
        type: Array
    },
    images:{
        type:Array
    },
    // stockDetails:{
    //     type:Array
    // },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    discountPercentage:{
        type:Number
    },
    category:{
        type:String
    },
    details:{
        type:String,
        required : [true,"Please add details"]
    },
    specs:{
        type:Object
    },
    seller:{
        type:String,
        required : [true,"Please add seller email id"],
        ref:"User"
    },
},
{
    timestamps:true
});

module.exports = mongoose.model("Product",productSchema);