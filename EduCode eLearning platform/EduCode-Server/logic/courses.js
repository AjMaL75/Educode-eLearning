import mongoose from "mongoose"
import Course from "../models/Courses.js"
import { createError } from "../utils/error.js"


const addCourse=async (req,res,next)=>{
    try{
             
        const newCourse=new Course({
            id:req.body.id,
            categoryid:req.body.categoryid,
            courseName:req.body.coursename,
            source:req.body.source,
            level:req.body.level,
            category:req.body.category
        })
        await newCourse.save()
        res.status(200).json("Data s are entered succesfully")
    }
    catch(err)
    {
        next(err)
    }

}
const getCourse=async (req,res,next)=>{
    try{     
   const  getcourse=await Course.find()

    if(!getcourse) return next("not found any courses")
    res.status(200).send(getcourse)
    }
    catch(err){
        next(err)
    }
    
}
const deleteCourse=async (req,res,next)=>{
    
    try{
        const courseId=req.params.id
        const deletedCourse=await Course.findByIdAndDelete(courseId);
        if(!deletedCourse) {return next(createError(400,"Please enter valid ID"))}
        res.status(200).json("Course has deleted successfully")
    }
    catch(err){
        next(err)
    }
}
const getCoursewithCatid=async(req,res,next)=>{
    try{
            const course=await Course.find({categoryid:req.query.id,category:req.query.category,categoryfield:req.query.categoryfield})
            if(!course)
            {
                next(createError(400,"not find any course"))
            }
            
            res.status(200).json(course)
    }
    catch(err)
    {
        console.log(err);
    }
}

export {addCourse,getCourse,deleteCourse,getCoursewithCatid}