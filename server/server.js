import express from "express";
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import dotenv from 'dotenv';

dotenv.config();

const app=express();

await connectDB(); //importing DB connection to main server file

//Middlewares

app.use(cors())
app.use(express.json())

//Routes
app.get('/',(req,res)=>{
    res.send("Api is working")
})

app.use('/api/admin',adminRouter)

app.use('/api/blog',blogRouter)



const PORT= process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Serving is running on Port ${PORT}`)
    console.log()
})

export default app;