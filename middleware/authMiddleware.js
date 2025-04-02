// import jwt from "jsonwebtoken"; // Import JWT for token verification

// // Authentication middleware
// const authMiddleware = (req, res, next) => {
//     const token = req.header("Authorization"); // Get token from headers
//     if (!token) return res.status(401).json({ message: "Access denied" }); // Check if token exists

//     try {
//         const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Verify token
//         req.user = decoded; // Attach user info to request
//         next(); // Proceed to next middleware
//     } catch (error) {
//         res.status(400).json({ message: "Invalid token" }); // Handle invalid token
//     }
// };

// export default authMiddleware;


import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

export default authMiddleware;