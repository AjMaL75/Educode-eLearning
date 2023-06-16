import mongoose, { Schema } from "mongoose";


const courseSchema=new Schema({
    id:{
        type:Number,
        required:true
    },
    categoryid:{
        type:Number,
        required:true
    },
    courseName:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
},{timestamps:true})

const Course=mongoose.model("Course",courseSchema)

export default Course