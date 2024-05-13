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
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("User",userSchema);