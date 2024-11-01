import {Response, Request, NextFunction, ErrorRequestHandler} from "express"
export class AppError extends Error{
    public statusCode: number;
    public status: string;
    constructor( statusCode: number, message: string,){
        
        super()
        this.message = message,
        this.statusCode = statusCode,
        this.status = `{statusCode}`.startsWith('4') ? "fail" : "error";

        Error.captureStackTrace(this, this.constructor)
    }
}

const errorHandler: ErrorRequestHandler = (error:any | AppError, req: Request, res:Response, next:NextFunction)=>{

console.log(error)
    const statusCode = error.statusCode || 500
    const message = error.message
   

    if(!(error instanceof AppError)){
        res.status(statusCode).send({
            success: false,
            message: "The problem is from our  end",
            data: null
        })
    }

    res.status(statusCode).send({
        message,
        success: false,
        data: null
    })

}


export default errorHandler;