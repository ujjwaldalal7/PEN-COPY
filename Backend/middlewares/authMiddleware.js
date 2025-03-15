import JWT from 'jsonwebtoken';
import User from '../models/user.js';

// ✅ Middleware to authenticate any logged-in user
export const userSignIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token is missing or invalid',
            });
        }

        const token = authHeader;

        // Verify the token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        req.user = user; // Attach user data to request
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please log in again.',
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please log in again.',
            });
        }

        console.error("Auth Error:", error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// ✅ Middleware to allow only admin users
export const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });
        }

        const token = authHeader;

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const user = await User.findById(decoded._id).select("-password");
        console.log(user)
        if (!user || user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access Denied: Admins Only",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: "Invalid or Expired Token",
        });
    }
};
