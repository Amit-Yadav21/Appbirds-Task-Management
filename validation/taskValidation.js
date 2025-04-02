import { body, param } from "express-validator";

// Task creation validation
const validateCreateTask = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Title is required"),
    body("status")
        .isIn(["Pending", "Ongoing", "Done"])
        .withMessage("Invalid status, must be 'Pending', 'Ongoing', or 'Done'"),
];

// Task ID validation for routes that use `req.params.id`
const validateTaskId = [
    param("id").isMongoId().withMessage("Invalid task ID format"),
];

// Task update validation
const validateUpdateTask = [
    param("id").isMongoId().withMessage("Invalid task ID format"),
    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
    body("description").optional().trim(),
    body("status")
        .optional()
        .isIn(["Pending", "Ongoing", "Done"])
        .withMessage("Invalid status, must be 'Pending', 'Ongoing', or 'Done'"),
];

// Task status change validation
const validateChangeTaskStatus = [
    param("id").isMongoId().withMessage("Invalid task ID format"),
    body("status")
        .isIn(["Pending", "Ongoing", "Done"])
        .withMessage("Invalid status, must be 'Pending', 'Ongoing', or 'Done'"),
];

export { validateCreateTask, validateTaskId, validateUpdateTask, validateChangeTaskStatus };