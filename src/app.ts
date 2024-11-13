import express from "express";
import errorHandler from "./middleware/errorHandler";
import router from "./routes/authRoute";
import userAuth from "./middleware/authmiddleware";
import employeeRouter from "./routes/employeeRoute";
import homeRouter from "./routes/homeRoute";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  };
app.use(cors(corsOptions)); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/dashboard", (req, res) => {
    res.send({
        message: "You are at home",
    });
});


app.use("/employee", userAuth, employeeRouter);
app.use("/auth", router);


app.use(errorHandler);

export default app;