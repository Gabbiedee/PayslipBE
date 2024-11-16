
import express, {Router} from "express"
import { displayCompanyName } from "../controller/userController";
const userRouter = Router();

userRouter.get("/getCompanyName", displayCompanyName)


export default userRouter
