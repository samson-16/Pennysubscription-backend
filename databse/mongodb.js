import mongoose from "mongoose";
import {DB_URI, NODE_ENV} from '../config/env.js'



if (!DB_URI){
    throw new Error("Please define the mongodb url in development environment"); 
}


const connectToMongoDB = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log("Connected to MongoDB successfully");
    }catch(error){
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectToMongoDB;