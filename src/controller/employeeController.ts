import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../middleware/errorHandler";
import employeeModel from "../models/employee.schema";

export const registerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract companyId from the decoded user info in req.user (set by authMiddleware)
    const token = req.headers.authorization?.split(" ")[1];

    const decoded = verifyToken(token);
    console.log(decoded)
    const companyId = decoded.companyId;

    if (!companyId) {
      throw new AppError(400, "Token is invalid or does not contain companyId");
    }

    // Destructure the employee data from the request body
    const {
      fullName,
      emailAddress,
      Address,
      JobRole,
      Resumptiondate,
      DOB,
      Gender,
      Nationality,
      phoneNo,
      employmentType,
      emergencyContact,
      Relationship,
      emergencyContactPhone,
    } = req.body;

    // Validate required fields
    if (!fullName || !emailAddress || !Address || !JobRole) {
      throw new AppError(400, "Kindly provide all fields");
    }

    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!emailAddress.match(emailRegex)) {
      throw new AppError(400, "Kindly provide a valid email address");
    }

    // Check if employee already exists
    const findEmployee = await employeeModel.findOne({
      emailAddress,
      companyId,
    });

    if (findEmployee) {
      throw new AppError(400, "Employee has already been registered!");
    }

    // Create a new employee document with the companyId to associate the employee with the correct company
    const newEmployee = await employeeModel.create({
      fullName,
      emailAddress,
      Address,
      JobRole,
      Resumptiondate,
      Gender,
      DOB,
      Nationality,
      phoneNo,
      employmentType,
      emergencyContact,
      Relationship,
      emergencyContactPhone,
      companyId, // Ensure the employee is tied to the correct company
    });

    if (!newEmployee) {
      throw new AppError(400, "Failed to Register employee, try again!");
    }

    res.status(201).send({
      message: "Employee created successfully",
      success: true,
      data: newEmployee._id,
    });
  } catch (error) {
    next(error);
  }
};


export const getEmployeeDetails = async (req: Request, res:Response, next:NextFunction)=>{
const { fullName } = req.query

console.log(fullName)

if (!fullName) {
  return next(new AppError(400, "Full name is required"));
}

try {
  const employees = await employeeModel.find({ fullName });

  if (employees.length === 0) {
    throw new AppError(400, "No Employee found with that name")
  }
  console.log(employees[0])
  res.status(200).send({
    message: "Successful",
    data: employees[0]
  })

  

}catch (error){
console.log(error)
next()
}

}
