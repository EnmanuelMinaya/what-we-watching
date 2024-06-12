import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


//POST api/users/auth 
//authUser, set token
//public access
const authUser = asyncHandler(async (req, res) => {
    return res.status(200).json({ message: 'authUser function was excuted' })
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
    })
    if (userExists) {
        throw Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        },
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400)
        throw Error('invalid user data')
    }



    return res.status(200).json({ message: 'registerUser function was excuted' })
});

//POST api/users/login 
//login
//public access
const login = asyncHandler(async (req, res) => {
    return res.status(200).json({ message: 'login function was excuted' })
});

//POST api/users/logout 
//logout
//public access
const logout = asyncHandler(async (req, res) => {
    return res.status(200).json({ message: 'logout function was excuted' })
});

//POST api/users/profile 
//profile
//public access
const getUserProfile = asyncHandler(async (req, res) => {
    return res.status(200).json({ message: 'getUserProfile' })
});

//PUT api/users/profile 
//profile
//public access
const updateUserProfile = asyncHandler(async (req, res) => {
    return res.status(200).json({ message: 'updateUserProfile' })
});



export {
    authUser,
    registerUser,
    login,
    logout,
    getUserProfile,
    updateUserProfile
};