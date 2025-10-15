const express = require('express')
const {register,getAllUsers,login,changeRole,forgotPassword,resetPassword} = require("../Controller/userController")
const {checkLogin,checkAdmin} = require('../Middleware/authentication')
const { signUp } = require('../Controller/userControllers')

const router = express.Router()

router.post('/user',signUp)

router.get('/user',checkLogin,checkAdmin,getAllUsers)

router.post('/userl',login)

router.patch('/makeAdmin',checkLogin,checkAdmin,changeRole)

router.post('/forgot',forgotPassword)

router.patch('/reset-password/:token',resetPassword)

module.exports = router

