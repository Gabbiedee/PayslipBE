
import express, {Router} from "express"
import { registerEmployee } from "../controller/employeeController";
const employeeRouter = Router();

employeeRouter.post("/register", registerEmployee)


export default employeeRouter;