import express from "express"
import { addCourse, deleteCourse, getCourse, getCoursewithCatid}  from "../logic/courses.js"

const router=express.Router()


router.post('/courseadd',addCourse)
router.get('/getcourse',getCourse)
router.delete('/deletecourse/:id',deleteCourse)
router.get('/getcoursewithcatid',getCoursewithCatid)



export default router