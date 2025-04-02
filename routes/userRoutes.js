import express from "express";
import { registerUser, loginUser, getAllUsers, getUserById, updateUserProfile, deleteUser, logoutUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"; 

// Create router instance
const router = express.Router(); 

// Route for user registration
router.post("/register", registerUser); 

// Route for user login
router.post("/login", loginUser); 

// Route to get all users (protected)
router.get("/all/data", getAllUsers);

// Route to get user by ID (protected)
router.get("/all/data/by/:id", getUserById); 

// Route to update profile (protected)
router.put("/update/profile", authMiddleware, updateUserProfile); 

// Route to delete user (protected)
router.delete("/delete/loggedIn", authMiddleware, deleteUser); 

// Route for user logout
router.post("/logout", authMiddleware, logoutUser); 

export default router;