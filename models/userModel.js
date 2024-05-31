const mongoose = require("mongoose");

//schema and validation for Users
const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required : [true,"Please add username"]
    },
    emailId:{
        type:String,
        required : [true, "Please add email address"],
        unique : [true,"Email address already exists!"]
    },
    password:{
        type:String,
        required : [true,"Please add password"]
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    phoneNumber:{
        type:String,
        required : [true,"Please add Phone number"],
        unique : [true,"Phone number already exists!"]
    },
    persona:{
        type:Number,
        required : [true,"Please add persona"]
    },
    address:{
        type:Array
    },
    cart:{
        type:Array
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("User",userSchema);