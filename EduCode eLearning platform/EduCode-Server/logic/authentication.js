

//creating logic for register one user

import User from "../models/User.js"
import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken"
import { createError } from "../utils/error.js"


const register=async(req,res,next)=>{

    try{
        await  User.findOne({email:req.body.email}).then(result=>{
            if(result) return res.send("user already exist please enter another email")
        })

        var salt=await bcrypt.genSalt(10)
        var hash=await bcrypt.hash(req.body.password,salt)
        const newUser=new User({

            username:req.body.username,
            password:hash,
            email:req.body.email

        })
       await newUser.save()

        res.status(200).json({
            message:"New user has registered successfully",
            result:newUser
        })
    }
    catch(err)
    {
        next(err)
    }
}

//creating logic for login users

const login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(400).json("This user does not exist");
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json("Wrong username or password");
      }
  
      const token = Jwt.sign(
        { id: user._id, isAdminvalue: user.isAdmin },
        process.env.JWT_SECRET
      );
  
      res.cookie("access_data", token, {
        httpOnly: true,
      });
  
      res.status(200).json({
        message:"You are successfully logged",
        result:user
      });
    } catch (err) {
      next(err);
    }
  };
const adminLogin=async (req,res,next)=>{
   try{ const adminData=await User.findOne({username:req.body.username})
    if(!adminData) return next(createError(400,"Please enter valid username"))
    const checkPass=await bcrypt.compare(req.body.password,adminData.password)
    if(!checkPass) return next(createError(400,"Please enter valid password"))
  const token=Jwt.sign({isAdmin:adminData.isAdmin,id:adminData._id},process.env.JWT)


     res.cookie("adminToken",token,{httpOnly:true}).status(200).json(adminData)
}
     catch(err)
     {
        console.log(err);
     }
}

export {register,login,adminLogin}