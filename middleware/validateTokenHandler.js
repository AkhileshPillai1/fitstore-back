const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401);
                    throw new Error("User is unauthorized");
                }
                req.user = decoded.user;
                next();
            });
        }else{
            res.status(401);
        throw new Error("User is unauthorized");
        }
    }
    else {
        res.status(401);
        throw new Error("User is unauthorized or token is missing");
    }
});

module.exports = validateToken;