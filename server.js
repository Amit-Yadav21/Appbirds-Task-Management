import express from "express";
import dotenv from "dotenv"; 
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import notFoundHandler from "./middleware/notFoundHandler.js";

// Load environment variables from .env file
dotenv.config(); 

// Initialize Express application
const app = express(); 

// Middleware to handle cookies
app.use(cookieParser()); 

// Middleware to parse JSON request bodies
app.use(express.json()); 

// Connect to the database
connectDB(); 

// Define API route for user-related endpoints
app.use("/api/users", userRoutes); 
app.use("/api/tasks", taskRoutes); 

// notFound Handling Middleware
app.use(notFoundHandler) 

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});