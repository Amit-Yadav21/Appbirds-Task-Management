import express from "express";
import { createTask, getTaskById, getTasks, getUserTasksByStatus, updateTask, changeTaskStatus, deleteTask } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import handleValidationErrors from "../middleware/handleValidationErrors.js";
import { validateCreateTask, validateTaskId, validateUpdateTask, validateChangeTaskStatus } from "../validation/taskValidation.js";

const router = express.Router();

// Create a new task
router.post("/create", authMiddleware, validateCreateTask, handleValidationErrors, createTask); 

// Get all tasks of logged-in user
router.get("/find/all", authMiddleware, getTasks);

// Get task by ID
router.get("/find/by/:id", authMiddleware, validateTaskId, handleValidationErrors, getTaskById); 

// All task logged-in user
router.get("/All/task/logged-in/user", authMiddleware, getUserTasksByStatus);

// Update task details
router.put("/update/by/:id", authMiddleware, validateUpdateTask, handleValidationErrors, updateTask); 

// Change task status
router.patch("/update/status/by/:id", authMiddleware, validateChangeTaskStatus, handleValidationErrors, changeTaskStatus); 

// Delete task
router.delete("/delete/by/:id", authMiddleware, validateTaskId, handleValidationErrors, deleteTask); 

export default router;