import express from "express";
import errorHandler from "./middleware/errorHandler";
import router from "./routes/authRoute";
import userAuth from "./middleware/authmiddleware";
import employeeRouter from "./routes/employeeRoute";
import homeRouter from "./routes/homeRoute";
import cors from "cors";

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Public route that doesn't require authentication
app.get("/dashboard", (req, res) => {
    res.send({
        message: "You are at home",
    });
});

// Apply userAuth middleware only to routes that need authentication
app.use("/employee", userAuth, employeeRouter);
app.use("/auth", router);

// If you have other routes for home, you can include them here
// For example:
// app.use("/", homeRouter); // Unprotected routes could be added

// Error handling middleware should be the last middleware
app.use(errorHandler);

export default app;