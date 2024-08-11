import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import generateToken from './utils/generateToken.js';

const prisma = new PrismaClient()


//POST api/users/auth 
//authUser, set token
//public access
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                throw new Error('invalid credentials');
            }
            if (result === true) {
                generateToken(res, user.id) //trying to login user 
                res.status(200).json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    result: result
                });
            } else {
                throw new Error('Invalid credentials');
            }
        });
    }
});


//POST api/users/auth 
//authUser, set token
//public access
const changePassword = asyncHandler(async (req, res) => {
    const { email, password, newPassword, newPasswordConfirm } = req.body;

    if (newPassword !== newPasswordConfirm) {
        throw Error('Passwords do not match');
    }
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (user) {
        bcrypt.compare(password, user.password, async function (err, result) {
            if (err) {
                throw new Error('invalid credential');
            }
            if (result === true) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);

                const user = await prisma.user.update({
                    where: {
                        email: email,
                    },
                    data: {
                        password: hashedPassword,
                    },
                });
                res.status(200).json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    result: result
                });
            } else {
                throw new Error('invalid credential');
            }
        });
    }
});



//POST api/users/register 
//registerUser
//public access
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    console.log(userExists);
    if (userExists) {
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        },
    })

    if (user) {
        generateToken(res, user.id)
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
});



//POST api/users/logout 
//logout
//public access
const logout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

//POST api/users/profile 
//profile
//public access
const getUserProfile = asyncHandler(async (req, res) => {
    let { id } = req.body;
    id = Number(id);
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    if (user) {
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
        })

    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

//PUT api/users/profile 
//profile
//public access
const updateUserProfile = asyncHandler(async (req, res) => {
    let { id, name, email } = req.body;
    id = Number(id);

    let updateUser = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if (updateUser) {
        name = name || updateUser.name;
        email = email || updateUser.email;
        updateUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                email: email,
            },
        });
    }


    if (updateUser) {
        res.status(200).json({
            id: updateUser.id,
            name: updateUser.name,
            email: updateUser.email,
        })
    } else {
        res.status(404);
        throw new Error('Resource not found')
    }


});



export {
    authUser,
    registerUser,
    logout,
    getUserProfile,
    updateUserProfile,
    changePassword
};