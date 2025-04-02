import express from "express";
import { createTask, getTaskById, getTasks, getUserTasksByStatus, updateTask, changeTaskStatus, deleteTask } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new task
router.post("/create", authMiddleware, createTask); 

// Get all tasks of logged-in user
router.get("/find/all", authMiddleware, getTasks);

// Get task by ID
router.get("/find/by/:id", authMiddleware, getTaskById); 

// All task logged-in user
router.get("/All/task/logged-in/user", authMiddleware, getUserTasksByStatus);

// Update task details
router.put("/update/by/:id", authMiddleware, updateTask); 

// Change task status
router.patch("/update/status/by/:id", authMiddleware, changeTaskStatus); 

// Delete task
router.delete("/delete/by/:id", authMiddleware, deleteTask); 

export default router;