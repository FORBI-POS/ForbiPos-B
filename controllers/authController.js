const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            role: user.role,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { user, token } = await authService.loginUser(username, password);

       res.cookie("jwt", token, {
  httpOnly: true,
  secure: true,       // MUST be true for SameSite=None on HTTPS
  sameSite: "none",   // REQUIRED for cross-site cookie usage
  path: "/",          // ensures cookie is accessible everywhere
  maxAge: 30 * 24 * 60 * 60 * 1000,
});


        res.json({
            _id: user._id,
            username: user.username,
            role: user.role,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const logout = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out' });
};

module.exports = {
    register,
    login,
    logout,
};
