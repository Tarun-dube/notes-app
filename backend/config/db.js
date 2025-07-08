  import mongoose from "mongoose";

 export const connectDB=async()=>{
    try{
     mongoose.connect(process.env.MONGO_URI);
     console.log("mongoose connected successfully");
    }catch(error){
console.error("error connecting mongodb",error);
process.exit(1);
    }
    
};