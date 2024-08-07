// import User from "../models/user.model.js";
// import {generateToken} from "../middleware/user.middleware.js";

// export const createUser = async (req, res) => {
//     try {
//         const { fullname, password, email, role } = req.body;
//         let user = await User.findOne({ email });

//         if (user) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         user = User.create({ fullname, password, email, role });
//         if (user) {
//             return res.status(201).json({ message: "User created successfully" });
//         }
//     } catch (e) {
//         res.status(500).json({ message: e.message });
//     }
// }

// export const editUser = async (req, res) => {
//     try {
//         const { fullname, password, email, role } = req.body;
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         user = await User.findOneAndUpdate({ email }, { fullname, password, email, role });

//         if (user) {
//             return res.status(200).json({ message: "User updated successfully" });
//         }
//     } catch (e) {
//         res.status(500).json({ message: e.message });
//     }
// }


// export const deleteUser = async (req, res) => {
//     try {
//         const { email } = req.body;
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         user = await User.findOneAndDelete({ email });
//         if (user) {
//             return res.status(200).json({ message: "User deleted successfully" });  
//         }   
//     } catch (e) {
//         res.status(500).json({ message: e.message });
//     }
// }

import User from '../models/user.model.js';
import userMiddleware from '../middleware/user.middleware.js';
import bcrypt from 'bcryptjs';

const userController = {
    register: async (req, res) => {
        try {
            const { fullname, email, password, role } = req.body;
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const user = new User({ fullname, email, password, role });
            await user.save();
            const token = userMiddleware.generateToken(user);
            res.status(201).json({ message: 'User registered successfully', token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = userMiddleware.generateToken(user);
            res.json({ message: 'Login successful', token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
};

export default userController;

