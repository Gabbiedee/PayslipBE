import express, { Express, Request, Response } from "express";
import app from "./app";
import dotenv from "dotenv"
import connectDB from "./config/db";

dotenv.config()


connectDB()
const PORT = process.env.PORT

app.get("/" , (req: Request, res:Response)=>{

    res.send({message: "Hello World"})
})


app.listen(PORT, ()=>{
console.log(`app is listening on PORT: ${PORT}`)
})