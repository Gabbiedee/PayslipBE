import express, {Response, Request, NextFunction} from "express";
import mongoose from "mongoose"; 
import { AppError } from "../middleware/errorHandler";
import UserModel from "../models/user.schema";
import { verifyToken } from "../utils/jwt";


export const displayCompanyName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];


        console.log(`displayComapny: ${token}`)



        if(!token){
            throw new AppError(400, "User is not authorized")

        }

        const payload = verifyToken(token)

        console.log(`decoded: ${payload.companyId}`)

        if (!mongoose.Types.ObjectId.isValid(payload.companyId)) {
            throw new AppError(400, "Invalid Company ID");
          }
    
        const companyName = await UserModel.findById(payload.companyId)

        console.log(` companyname: ${companyName}`)

        if(!companyName){
            throw new AppError(404, "Compay not found")
        }

        res.status(200).send({
            message: "Company name Found",
            data: companyName.organisationName
        })
        
    } catch (error) {
        next(error)
    }

  

}
