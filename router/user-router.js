const express = require('express')
const { getUsers } = require('../controller/user-controller')
const userRouter = express.Router()

userRouter.get('', getUsers)

module.exports = {userRouter}