import express from 'express';
import {
    authUser,
    registerUser,
    login,
    logout,
    getUserProfile,
    updateUserProfile
} from '../../Controller/userController.js';


const router = express.Router();


router.post('/auth', authUser);
router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);


export default router;
