const {createBusiness,getBusiness,getByCategory,updateB,getOneById, deleteB,likeBusiness} = require('../Controller/businessController')
const {checkLogin} = require('../Middleware/authentication')
const express = require('express')
const router = express.Router()


router.post('/pitch',checkLogin,createBusiness)

router.post('/like',likeBusiness)

router.get('/businesses',getBusiness)

router.get('/business',getByCategory)

router.get('/Abusiness/:id',getOneById)

router.patch("/business/:id",updateB)//admin only

router.delete("/business/:id",deleteB)

module.exports = router
