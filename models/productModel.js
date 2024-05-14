const mongoose = require("mongoose");

//schema and validation for Products
const productSchema = mongoose.Schema({
    userEmail :{
        type:String,
        required : [true,"Please add user email"],
        ref:"User"
    },
    productName:{
        type: String,
        required : [true,"Please add product name"]
    },
    price:{
        type:Number,
        required : [true, "Please add price"]
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Product",productSchema);