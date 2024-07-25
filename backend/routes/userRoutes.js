import express from 'express';
import {
    authUser,
    registerUser,
    logout,
    getUserProfile,
    updateUserProfile,
    changePassword,
} from '../../Controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/auth', authUser);
router.post('/register', registerUser);
router.post('/logout', logout);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/changePassword', changePassword);


export default router;
