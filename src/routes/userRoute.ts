
import express, {Router} from "express"
import { displayCompanyName, updateCompanyProfile, displayCompanyProfile } from "../controller/userController";
const userRouter = Router();

userRouter.get("/getCompanyName", displayCompanyName)
userRouter.get("/getCompany", displayCompanyProfile)
userRouter.patch("/updateProfile", updateCompanyProfile)


export default userRouter
