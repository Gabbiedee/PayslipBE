import express, {Request, Response, Router} from "express"
const homeRouter = Router();
homeRouter.get("/", (req:Request, res:Response)=>{
    res.send({
        message: "Service running"
    })
})

export default homeRouter