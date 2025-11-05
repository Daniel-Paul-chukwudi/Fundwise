const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images')
    },
    filename:(req,file,cb)=>{
        console.log(file);
        
        const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`
        const ext = file.mimetype.split('/')[1]
        cb(null, `IMG_${uniqueSuffix}.${ext}`)
    }
})

const fileFilter = (req,file,cb)=>{
    const allowedMimes = [
      'application/pdf',
    ];
    if (allowedMimes.includes(file.mimetype) || file.mimetype.startsWith('image/')){ 
        cb(null, true);
    }else {
        cb(new Error('Invalid file type. Only Image and PDF allowed.'));
    }
}
const limits = {
    fileSize:1024*1024*10
}

exports.uploads = multer({
    storage,
    fileFilter,
    limits
})

// exports.uploadDoc = multer({
//     storage2,
//     fileFilter:fileFilter2,
//     limits
// })

// module.exports = uploads,uploadDoc