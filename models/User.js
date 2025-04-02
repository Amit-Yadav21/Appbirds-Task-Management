import mongoose from "mongoose"; 

// Define user schema
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }, 
    },
    { timestamps: true } // Add times (createdAt, updatedAt)
);

const User = mongoose.model("User", userSchema); // Create user model
export default User;