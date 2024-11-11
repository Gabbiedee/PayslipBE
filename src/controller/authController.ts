import express, {Response, Request, NextFunction} from "express";
import  bcrypt from "bcrypt"
import { assignToken } from "../utils/jwt";
import { AppError } from "../middleware/errorHandler";
import UserModel from "../models/user.schema";

export  const Register = async (req: Request, res:Response, next:NextFunction )=>{
    
    const {emailAddress, organisationName, password, Cpassword} = req.body

    console.log(req.body)

    try {
        if(!emailAddress || !organisationName || !password || !Cpassword){
            console.log("Enter fields")
              throw new AppError(401, "Please enter all fields"); 
               
        }

        if(password !== Cpassword){
            throw new AppError(401, "Entered confirm Password does not match Password")
        }

        const searchUser = {
            $or: [
                { emailAddress: emailAddress },
                { organisationName: organisationName }
            ]
        };

        const findUser = await UserModel.findOne(searchUser)

        if(findUser){
            console.log("User Already exist, Kindly go to login")
           throw new AppError(400, "User already exist, kindly go to login page")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await UserModel.create({
            emailAddress,
            organisationName,
            password: hashedPassword
        })

        console.log(user)

        if(!user){
            throw new AppError(400, "Failed to register user, Try again later")
        }

        const token = assignToken({userID: user.id})

        res.status(201).send({
            message: "User successfully registered",
            success: true,
            data: token
        })

        



        
    } catch (error) {
        next(error)
    }

}


export const Login = async (req: Request, res:Response, next:NextFunction )=>{
    
    const {emailAddress, password} = req.body

    console.log(req.body)

    try {
        if (!emailAddress || !password) {
            console.log("Enter fields");
            throw new AppError(400, "Please enter all fields");
        }

        
        const existingUser = await UserModel.findOne({
            emailAddress: emailAddress
        }
        )

        
        console.log(existingUser)

        if(!existingUser){
            throw new AppError(400, "User does not exist, kindly enter correct details or Register")
        }

        const comparedPassword = await bcrypt.compare(password, existingUser.password)

        if(!comparedPassword){
            throw new AppError(400, "Password is not correct, kindly input correct password")
        }

        console.log(existingUser)

        const token = assignToken({userID: existingUser.id})

        res.status(200).send({
            message: "User successfully logged in",
            success: true,
            data: token
        })
        

    


        
    } catch (error) {
        next(error)
    }

}


// export const SignOut = (req: Request, res: Response) => {

// }


