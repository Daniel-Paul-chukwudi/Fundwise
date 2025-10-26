const {createBusiness,getBusiness,getByCategory,updateB,getOneById, deleteB,likeBusiness,viewBusiness} = require('../Controller/businessController')
const {checkLogin,checkSubscription,checkAdmin} = require('../Middleware/authentication')
const express = require('express')
const router = express.Router()


router.post('/pitch',checkLogin,createBusiness)

// router.post('/like',checkLogin,likeBusiness)

router.post('/like',checkLogin,likeBusiness)

router.post('/view',checkLogin,viewBusiness)

router.get('/businesses',getBusiness)

router.get('/business',getByCategory)

router.get('/Abusiness/:id',getOneById)

router.patch("/business/:id",updateB)//admin only

router.delete("/business/:id",deleteB)//admin only

module.exports = router
