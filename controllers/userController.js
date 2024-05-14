const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ emailId: email });
    if (user) {
        res.status(400);
        throw new Error("This email is already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 15);//password hashing
    const createdUser = await User.create({
        userName: username, emailId: email, password: hashedPassword
    })
    if (createdUser) {
        res.status(200).json({ res: "Created", user: createdUser });
    }
    else {
        res.status(500);
        throw new Error("User registration failed");
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ emailId: email });
    if (!user) {
        res.status(404);
        throw new Error("This user doesn't exist");
    }
    if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.emailId
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" })
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("Email or Password incorrect");
    }
    res.send("Logged in");
});

const getUserDetails = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = { register, login, getUserDetails };