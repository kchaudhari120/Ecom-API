const express = require('express')
const { getUsers, saveUser } = require('../controller/user-controller')
const userRouter = express.Router()
//api/user/


userRouter.get('', getUsers)
userRouter.post('', saveUser)
module.exports = {userRouter}