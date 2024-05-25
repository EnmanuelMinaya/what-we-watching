import asyncHandler from 'express-async-handler';


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