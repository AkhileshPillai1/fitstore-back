const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
    code:{
        type: String,
        required : [true,"Please add code"],
        unique : [true,"Email address already exists!"]
    },
    name:{
        type:String
    },
    discountPercentage:{
        type:Number,
        required : [true,"Please add discount percentage"]
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Coupon",couponSchema);