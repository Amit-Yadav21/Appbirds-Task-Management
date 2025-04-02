import express from "express";
import { registerUser, loginUser, getAllUsers, getUserById, updateUserProfile, deleteUser, logoutUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"; 
import handleValidationErrors from "../middleware/handleValidationErrors.js";
import { validateRegister, validateLogin, validateProfileUpdate, validateGetUserById } from "../validation/userValidation.js";

// Create router instance
const router = express.Router(); 

// Route for user registration
router.post("/register", validateRegister, handleValidationErrors, registerUser); 

// Route for user login
router.post("/login", validateLogin, handleValidationErrors, loginUser); 

// Route to get all users 
router.get("/all/data", getAllUsers);

// Route to get user by ID
router.get("/all/data/by/:id", validateGetUserById, handleValidationErrors, getUserById); 

// Route to update profile (protected)
router.put("/update/profile", validateProfileUpdate, authMiddleware, updateUserProfile); 

// Route to delete user (protected)
router.delete("/delete/loggedIn", authMiddleware, deleteUser); 

// Route for user logout
router.post("/logout", authMiddleware, logoutUser); 

export default router;