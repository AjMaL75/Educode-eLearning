import User from "../models/User.js"
import { createError } from "../utils/error.js";

const getUsers=async (req,res,next)=>{
    
    try{
            const getAllUsers=await User.find();
            res.status(200).json(getAllUsers)
    }
    catch(err)
    {
        next(err)
    }
}

const deleteUser=async (req,res,next)=>{
    try{
            const user=await User.findByIdAndDelete(req.params.id)
            if(!user)
            {
                next(createError(400,"invalid id"))
            }
            res.status(200).json("Successfully deleted")
    }
    catch(err)
    {
        console.log(err);
    }
}
export {getUsers,deleteUser}