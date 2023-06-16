import express from "express"
import { deleteUser, getUsers } from "../logic/users.js"

const router=express.Router()


//update
// router.put("/:id",updateUser)

//delete

// router.delete("/:id",deleteUser)

//getuser
// router.get("/:id",getUser)

//getAlluser
router.get("/getUsers",getUsers)

router.delete('/deleteUser/:id',deleteUser)

export default router