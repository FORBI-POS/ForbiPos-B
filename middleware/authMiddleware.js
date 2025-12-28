import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;

    if (req.cookies.jwt) {
        try {
            token = req.cookies.jwt;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id)
                .populate("role")
                .select("-password");

            // Normalize role ALWAYS to string
            req.user = {
                ...user._doc,
                role: decoded.role || user.role?.name
            };

            return next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    res.status(401).json({ message: "Not authorized, no token" });
};


const authorize = (...roles) => {
    return (req, res, next) => {
        // Handle both string roles and role objects with name property
        const userRole = typeof req.user.role === 'object' && req.user.role?.name
            ? req.user.role.name
            : req.user.role;

        if (!roles.includes(userRole)) {
            return res.status(403).json({
                message: `User role ${userRole} is not authorized to access this route`
            });
        }
        next();
    };
};

export { protect, authorize };
