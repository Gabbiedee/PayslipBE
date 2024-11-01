import express  from "express"
import { Register, Login } from "../controller/authController"
import { Router } from "express"


const router = Router()


router.post("/signup", Register)
router.post("/login", Login)



export default router