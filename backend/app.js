import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import categoriesRoute from "./routes/categoriesRoute.js";
import productRoute from "./routes/productRoute.js";
import userRoute from './routes/userRoute.js';
import blogRoute from './routes/blogRoute.js';

import authRoute from './routes/authRoute.js';
import orderRoute from './routes/orderRoute.js';
import heroRoute from './routes/heroRoute.js';

import path from "path";
import url from "url";
import cookieParser from "cookie-parser";



const app= express();
//for connection
dotenv.config();

//Middleware
app.use(cors({
  origin : "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

//upload file and images
export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
app.use('/uploads',express.static(path.join(__dirname,"uploads")));



//routers
app.use('/api/category',categoriesRoute);
app.use('/api/product',productRoute);
app.use('/api/user',userRoute);
app.use('/api/blog',blogRoute);
app.use('/api/heroes',heroRoute);

app.use('/api/auth',authRoute);

app.use('/api/order',orderRoute);



//Database connection
connectDB();

//port
const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=> {
  console.log(`server running on port ${PORT}`);
});