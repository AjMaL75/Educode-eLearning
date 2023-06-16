import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authenticationRoute from "./routes/authentication.js"
import courseRoute from "./routes/courses.js"
import usersRoute from './routes/users.js'
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express()
dotenv.config()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hi ajmal how are you")
})

//mongoDB connection using url
const connect=async()=>{
        try{
           await  mongoose.connect(process.env.MONGO_URL)
            console.log("mongoDB server connected successfully");
        }
        catch(err)
        {
                console.log(err);
        }
}
//middlewares
app.use(cookieParser())
app.use(cors())
app.use("/authentication",authenticationRoute)
app.use("/courses",courseRoute)
app.use("/users",usersRoute)
// app.use("/users",authenticationRoute)
mongoose.connection.on("connected",()=>{
    console.log("mongoServer connected");
})
mongoose.connection.off("disconnected",()=>{
    console.log("mongoServer disconnected");
})

//error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
    next()
  });

app.listen(8000,()=>{
    connect()
    console.log("backend is running");
})