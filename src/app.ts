import express from "express"
import errorHandler from "./middleware/errorHandler"
import router from "./routes/authRoute"
import userAuth from "./middleware/authmiddleware";
import employeeRouter from "./routes/employeeRoute";

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/employee", employeeRouter)
app.use("/auth", router)

app.use(userAuth)


app.get("/home" ,(req, res)=>{
res.send({
    message: "You are at home"
})
})
app.use(errorHandler)


export default app;