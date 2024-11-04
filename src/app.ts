import express from "express"
import errorHandler from "./middleware/errorHandler"
import router from "./routes/authRoute"
import userAuth from "./middleware/authmiddleware";
import employeeRouter from "./routes/employeeRoute";
import homeRouter from "./routes/homeRoute";
import cors from 'cors';

const app = express()

app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/", homeRouter )
app.use("/employee", employeeRouter)
app.use("/auth", router)

app.use(userAuth)


app.get("/dashboard" ,(req, res)=>{
res.send({
    message: "You are at home"
})
})
app.use(errorHandler)


export default app;