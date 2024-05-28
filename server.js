const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

connectDb();//connects to db once at the start of the application lifecycle

app.use(cors({
    origin: 'http://localhost:4200'
  }));
app.use(express.json());//json body parser. used to parse(deserialize) incoming request body into json
app.use("/products/",require("./routes/productRoutes"));//routing file for Product apis
app.use("/users/",require("./routes/userRoutes"));//routing file for User apis
app.use(errorHandler);///middleware for handling errors. express automatically invokes this middleware whenever an error is thrown across the application

//app starts listening here to incoming requests
app.listen(port,()=>{
    console.log(`Hello ${port}`)
})