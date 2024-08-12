const multer  = require('multer')
const fs = require('node:fs');
const path = require('path');

const folderName = path.join(__dirname, '..', 'uploads');


try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folderName)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
  module.exports = upload