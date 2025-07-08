import express from 'express';
const app=express();
import notesRoutes from './routes/notesRoutes.js';
import loginRoutes from "./routes/userRoutes.js";
import {connectDB} from '../config/db.js';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();

const PORT=process.env.PORT||5001;

const JWT_SECRET=process.env.JWT_SECRET;

connectDB(); 
//middlewares
app.use(express.json());

app.use("/api/user",loginRoutes);

app.use("/api/notes",notesRoutes);


 
app.listen(PORT,()=>{
    console.log("server started on port:"+PORT);

});