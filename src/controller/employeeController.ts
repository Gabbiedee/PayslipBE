import { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/errorHandler";
import employeeModel from "../models/employee.schema";

export const registerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
        const {fullName, emailAddress, Address, JobRole, Resumptiondate} = req.body

    if(!fullName || !emailAddress || !Address || !JobRole){
        throw new AppError(400, "Kindly provide all fields")
    }

    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if(!(emailAddress.match(emailRegex))){
        throw new AppError(400, "Kindly provide a valid email address")
    }

    // check if employee already exists
    const findEmployee = await employeeModel.findOne({
        emailAddress
    })

    if(findEmployee){
        throw new AppError(400, "Employee has already been registered!")
    }

    const newEmployee = await employeeModel.create({
        fullName,
        emailAddress,
        Address,
        JobRole,
        Resumptiondate
    })

    if(!newEmployee){
        throw new AppError(400, "Failed to Register employee, try again!")
    }

    res.status(201).send({
        message: "Employee created succesfully",
        success: true,
        data: newEmployee._id
    })
        
    } catch (error) {
        next(error)
    }
    

};
