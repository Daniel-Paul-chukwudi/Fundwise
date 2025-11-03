const {markAllRead,allNotifications,allNotificationsById,deleteNotification, createNofification} = require('../Controller/notificationController')
const { checkLogin, checkInvestorLogin } = require('../Middleware/authentication')

const router = require('express').Router()

router.post('/addNotification',createNofification)

router.patch('/allRead',checkLogin,markAllRead)

router.patch('/allReadI',checkInvestorLogin,markAllRead)

router.get('/allNotifications',allNotifications)

router.get('/allNotifications',checkLogin,allNotificationsById)

router.get('/allNotificationsI',checkInvestorLogin,allNotificationsById)

router.delete('/KillN',deleteNotification)

module.exports = router