const express = require('express')
const {register,getAllUsers,login,changeRole} = require("../Controller/userController")
const {checkLogin,checkAdmin} = require('../Middleware/authentication')

const router = express.Router()

router.post('/user',register)

router.get('/user',checkLogin,checkAdmin,getAllUsers)

router.post('/userl',login)

router.patch('/makeAdmin',checkLogin,checkAdmin,changeRole)

module.exports = router

