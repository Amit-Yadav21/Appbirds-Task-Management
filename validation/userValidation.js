import { body, param } from "express-validator";

// User Registration Validation
const validateRegister = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
];

// User Login Validation
const validateLogin = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
];

// Update Profile Validation
const validateProfileUpdate = [
    body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
    body("email").optional().isEmail().withMessage("Invalid email format"),
];

// Get User By ID Validation
const validateGetUserById = [
    param("id").isMongoId().withMessage("Invalid user ID format"),
];

// Delete User Validation (optional if needed)
const validateDeleteUser = [
    param("id").isMongoId().withMessage("Invalid user ID format"),
];
export { validateRegister, validateLogin, validateProfileUpdate, validateGetUserById };