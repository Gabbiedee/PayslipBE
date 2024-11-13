
import express, {Router} from "express"
import { registerEmployee, getEmployeeDetails } from "../controller/employeeController";
const employeeRouter = Router();

employeeRouter.post("/register", registerEmployee)
employeeRouter.get("/searchEmployee", getEmployeeDetails)


export default employeeRouter;