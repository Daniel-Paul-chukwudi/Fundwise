const multer = require('multer');

// store file in memory (not on disk)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 } // 3MB
});

module.exports = upload;
