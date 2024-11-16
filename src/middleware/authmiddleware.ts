import {Request, Response, NextFunction} from "express"
import { AppError } from "./errorHandler"
import { verifyToken } from "../utils/jwt"
import UserModel from "../models/user.schema"
const userAuth = async (req:Request, res:Response, next:NextFunction) =>{

    const header = req.headers.authorization 

    console.log(`header : ${header}`)
    try {
        // validate if header has the correct formation
        if(!(header || header?.startsWith("Bearer "))){
            next(new AppError(400, "User is not authourized")) 
        }

        // split header into array and get the token in index 1
        const token = header?.split(" ")[1]
        console.log(`userAuthtoken: ${token}`)
        // verifytoken function returns the payload that was signed into the token
        const payload: any = verifyToken(token)
        console.log(`userAuthpayload: ${payload}`)
        console.log(`userAuthpayloadID: ${payload.companyId}`)
        // the payload contains the Userid
        const user = await UserModel.findOne({_id: payload.companyId})
        console.log(user)
        // verify if user exist
        if(!user){
            next(new AppError(401, "User is not authourized"))
        }

        // attach user from db to the req interface
        (req as any).user = user
        // move to the next middleware
        next()
        
    } catch (error) {
        next(new AppError(401, "User is not authourized"))
    }
   
}

export default userAuth