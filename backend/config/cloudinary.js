const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dmjpuriol",
  api_key: "269357341755717",
  api_secret: "EReJe8R50UxSMEDWqT4ETioKy1I",
});

const uploadImageToCloudinary = async(path) => {
    const result = await cloudinary.uploader.upload(path, {
        folder: 'ecommerce', 
      });
    return result
}

module.exports = {uploadImageToCloudinary}