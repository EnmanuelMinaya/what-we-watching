import express from 'express';
import { createShowList } from '../../Controller/showListController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/create', protect, createShowList);
//router.delete('/delete', protect, deleteShowList);


export default router;
