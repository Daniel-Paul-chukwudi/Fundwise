const notificationModel = require('../models/notification')

exports.notify = async (options)=>{
    await notificationModel.create({
        userId:options.userId,
        businessId:options.businessId,
        title:options.title,
        description:`${options.description}`
        })
}
