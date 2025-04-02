// Import Mongoose
import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Prevent deprecation warnings
            useUnifiedTopology: true, // Optimize connection handling
        });
        console.log("MongoDB Connected"); // Success message
    } catch (error) {
        console.error("MongoDB Connection Error:", error); // Log error
        process.exit(1); // Exit on failure
    }
};

export default connectDB;