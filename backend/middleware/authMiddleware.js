import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const protect = expressAsyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;

    if (token) {
        try {
            let { userId } = jwt.verify(token, process.env.JWT_SECRET);
            const id = Number(userId);
            req.user = await prisma.user.findUnique({
                omit: {
                    password: true,
                },
                where: {
                    id: id,
                },
            });
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }

    } else {
        res.status(401);
        throw new Error('Not authorized');
    }

});

export { protect };