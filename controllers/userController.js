const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
    const userObj = req.body;
    if (!userObj.username || !userObj.emailId || !userObj.password || !userObj.persona || !userObj.phoneNumber) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    if(userObj.phoneNumber.length < 10 || userObj.phoneNumber.length > 13){
        res.status(400);
        throw new Error("Please enter a valid phone number");
    }
    const hashedPassword = await bcrypt.hash(userObj.password, 15);//password hashing
    try{
        const createdUser = await User.create({
            userName: userObj.username, emailId: userObj.emailId, password: hashedPassword, firstName: userObj.firstName, lastName: userObj.lastName, phoneNumber:userObj.phoneNumber, persona: userObj.persona, address : [], cart : []
        })
        if (createdUser) {
            res.status(200).json({ res: "Created", user: createdUser });
        }
        else {
            res.status(500);
            throw new Error("User registration failed");
        }
    }
    catch(err){
        if(err.code){
            res.status(409)
            throw new Error("This " + Object.keys(err.keyValue)[0] +" is already registered");
        }
        else{
            res.status(500)
            throw new Error("Internal Server Error");
        }
    }
});

const login = asyncHandler(async (req, res) => {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ emailId });
    if (!user) {
        res.status(404);
        throw new Error("This user doesn't exist");
    }
    if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                emailId: user.emailId
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "240m" });
        const bearerToken = `Bearer ${accessToken}`;
        res.status(200).json({ bearerToken,user });
    }
    else {
        res.status(401);
        throw new Error("Email or Password incorrect");
    }
});

const getUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findOne({ emailId:req.user.emailId });
    res.json(user);
});


module.exports = { register, login, getUserDetails };