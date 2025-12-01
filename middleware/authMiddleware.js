const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.cookies.jwt) {
        try {
            token = req.cookies.jwt;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
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

module.exports = { protect, authorize };
