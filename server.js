const express = require("express");
const dotenv = require("dotenv").config;

const app = express();

const port = process.env.PORT || 3000;

app.use("/products/",require("./routes/productRoutes"));

app.listen(port,()=>{
    console.log(`Hello ${port}`)
})