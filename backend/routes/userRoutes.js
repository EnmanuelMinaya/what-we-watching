import express from 'express';
import {
    authUser,
    registerUser,
    logout,
    getUserProfile,
    updateUserProfile,
    changePassword,
} from '../../Controller/userController.js';


const router = express.Router();


router.post('/auth', authUser);
router.post('/register', registerUser);
router.post('/logout', logout);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/changePassword', changePassword);


export default router;
