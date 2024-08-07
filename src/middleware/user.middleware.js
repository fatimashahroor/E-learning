import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userMiddleware = {
    hashPassword: async (req, res, next) => {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(password, salt);
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    generateToken: (user) => {
        return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    }
};
export default userMiddleware;