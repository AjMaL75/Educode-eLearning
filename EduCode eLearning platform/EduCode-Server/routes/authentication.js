//import express
import express from "express"
import { adminLogin, login, register } from "../logic/authentication.js"
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js"


//create router using router method from express
const router=express.Router()

//api accepting request from client 
 
router.post("/register",register)

 router.post("/login",login)

 router.post('/adminlogin',adminLogin)

 router.get('/checkAdmin/:id',verifyAdmin,(req,res,next)=>{
    res.send("Hey admin you can manage the dashboard")
 })

 router.get('/checkauthentication',verifyToken,(req,res,next)=>{
    res.send("you are authorized")
 })


export default router