import express from 'express';
import {
    addToList,
} from '../../Controller/showListController.js';


const router = express.Router();


router.post('/addToList', addToList);



export default router;
