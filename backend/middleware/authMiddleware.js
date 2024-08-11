import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';

const protect = expressAsyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await prisma.user.findUnique({
                omit: {
                    password: true,
                },
                where: {
                    id: decoded.userId,
                },
            });
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }

    } else {
        res.status(401);
        throw new Error('Not authorized');
    }

});

export { protect };