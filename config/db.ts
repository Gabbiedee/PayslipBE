import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const URL: string = process.env.MONGODB_URI || ""
const connectDB = async ()=>{
const conn = await mongoose.connect(URL)
console.log(`Connect to database: ${conn.connection.host}`)

mongoose.set('strictQuery', true)
}


export default connectDB