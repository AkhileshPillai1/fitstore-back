const mongoose = require("mongoose");

//connecting to db
const connectDb = async () => {
    try{
        const connection = await mongoose.connect(process.env.CONN_STRING,{dbName:process.env.DB_NAME});
        console.log("Connected"+ connection.connection.host + connection.connection.name);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;