const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("you are in the error section of the db.js file");
        console.error(`Error: ${error.message}`);
        
    }
};

module.exports = connectDB;
