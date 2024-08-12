import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

const createShowList = asyncHandler(async (req, res) => {
    const { name: showListName } = req.body;
    const { id: authorId } = req.user;

    const showList = await prisma.showList.create({
        data: {
            name: showListName,
            visibility: 'private',
            authorId: authorId
        },
    });
    if (showList) {
        res.status(200).json({
            id: showList.id,
            name: showList.name
        });
    } else {
        throw new Error('Error saving new showList to database');
    }



});

export {
    createShowList,
};