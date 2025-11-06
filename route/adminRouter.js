const {createAdmin,getAllAdmins,getOne,updateAdmin,deleteAdmin,verifyBusiness,verifyKyc} = require('../Controller/adminController')

const router = require('express').Router()

router.post('/admin',createAdmin)

router.get('/allAdmins',getAllAdmins)

router.get('/admin/:id',getOne)

router.patch('/admin',updateAdmin)

router.patch('/verifyBusiness',verifyBusiness)

router.patch('/verifyKyc',verifyKyc)

router.delete('/admin',deleteAdmin)

module.exports = router