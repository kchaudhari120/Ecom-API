const express = require('express')
const { getUsers, saveUser, loginUser} = require('../controller/user-controller')
const userRouter = express.Router()
//api/user/


userRouter.get('/', getUsers)
userRouter.post('/', saveUser)
userRouter.post('/login', loginUser)
module.exports = {userRouter}