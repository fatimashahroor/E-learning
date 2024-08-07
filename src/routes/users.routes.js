import express from 'express';
const router = express.Router();
import userController from '../controllers/users.controller.js';
import userMiddleware from '../middleware/user.middleware.js';

router.post('/register', userMiddleware.hashPassword, userController.register);
router.post('/login', userController.login);
export default router;
