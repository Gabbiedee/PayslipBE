import { Request, Response, NextFunction, RequestHandler} from "express";
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
    console.log(decoded);
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



export const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(401, "Authorization token is required");
    }

    const decoded = verifyToken(token) as { companyId: string };
    const companyId = decoded.companyId;

    if (!companyId) {
      throw new AppError(400, "Token is invalid or does not contain companyId");
    }

    const employees = await employeeModel.find({ companyId });

    if (!employees || employees.length === 0) {
      throw new AppError(404, "No employee registered with this organization");
    }

   

    res.status(200).json({
      message: "Successful",
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(401, "Authorization token is required");
    }

    const decoded = verifyToken(token) as { companyId: string };
    const companyId = decoded.companyId;

    if (!companyId) {
      throw new AppError(400, "Token is invalid or does not contain companyId");
    }

    const employees = await employeeModel.find({ companyId });

    if (!employees || employees.length === 0) {
      throw new AppError(404, "No employee registered with this organization");
    }

    const { fullName } = req.query

    const filteredResult = employees.filter(employee => employee.fullName === fullName)

    console.log(filteredResult)

    if(filteredResult.length === 0){
      console.log("There is no Employee registered with this name")
      throw new AppError(400, "There is no Employee registered with this name")
    }

    res.status(200).send({
      message: "Done",
      data: filteredResult
    })
   
  } catch (error) {
    next(error);
  }
};