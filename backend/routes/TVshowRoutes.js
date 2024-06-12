import express from 'express';
import {
    addToList,
} from '../../Controller/TVshowController.js';


const router = express.Router();


router.post('/addToList', addToList);



export default router;
