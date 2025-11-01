const {createAdmin,getAllAdmins,getOne,updateAdmin,deleteAdmin} = require('../Controller/adminController')

const router = require('express').Router()

router.post('/admin',createAdmin)

router.get('/allAdmins',getAllAdmins)

router.get('/admin/:id',getOne)

router.patch('/admin',updateAdmin)

router.delete('/admin',deleteAdmin)

module.exports = router