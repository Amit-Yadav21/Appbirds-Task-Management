import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email }); // Check if user exists
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        await User.create({ name, email, password: hashedPassword }); // Save new user

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); // Find user

        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password); // Verify password
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // Generate token with only necessary user data
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Store token in a cookie
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 3600000 });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error); // Log error for debugging
        res.status(500).json({ message: "Error logging in", error });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Find user by ID
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Ensure only logged-in users can update their profile
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Create an object with fields to update
        let updateFields = {};
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt); // Hash the new password
        }

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Profile updated successfully", user: updatedUser });

    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
};

// Delete user
// const deleteUser = async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.user.id); // Remove user
//         res.clearCookie("token"); // Clear token
//         res.json({ message: "User deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting user", error });
//     }
// };

const deleteUser = async (req, res) => {
    try {
        // Ensure user is login
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Find user before deleting
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete user
        await User.findByIdAndDelete(req.user.id);

        // Clear authentication token from cookies
        res.clearCookie("token");
        res.json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

// Logout user
// const logoutUser = async (req, res) => {
//     try {
//         res.clearCookie("token"); // Remove token
//         res.json({ message: "User logged out successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error logging out", error });
//     }
// };

const logoutUser = async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.cookies.token) {
            return res.status(400).json({ message: "User is already logged out" });
        }
        
        // Clear authentication token from cookies
        res.cookie("token", "", { httpOnly: true, secure: true, expires: new Date(0) });
        res.json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out", error: error.message });
    }
};

export { registerUser, loginUser, getAllUsers, getUserById, updateUserProfile, deleteUser, logoutUser };