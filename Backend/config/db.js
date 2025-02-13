import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO)
        console.log("Connected to database");
    }
    catch(error){
        console.log("Failed to connect database");
        console.log(error)
    }
} 

export default connectDB;