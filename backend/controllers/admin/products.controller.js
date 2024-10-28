const mongoose = require("mongoose")
const Product = require("../../models /product.model")
const {uploadImageToCloudinary} = require("../../config/cloudinary")


exports.create = async (req, res) => {
    try {
        const payload = req.body
        const files = req.files
        payload.images = files.map(file => file.filename)
        payload.cloudinaryURLs = await Promise.all(
            files.map(async (file) => {
              const result = await uploadImageToCloudinary(file.path);
              return result.secure_url; 
            })
          );
          
        const product = await Product.create(payload)
        return res.status(200).send({ message: "Product Created Successfully", data: product })

    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })

    }
}

exports.list = async (req, res) => {
    try {
        let { page = 1, limit = 10, title, featured, categoryId } = req.query;

        page = parseInt(page)
        limit = parseInt(limit)

        let query = {}
        if (title) query.title = { $regex: title, $options: "i" }
        if (featured !== undefined) query.featured = featured
        if (categoryId) query.categoryId = categoryId

        const total = await Product.countDocuments(query)
        const totalPages = Math.ceil(total / limit)
        if (total > 0 && page > totalPages) page = totalPages
        const skip = (page - 1) * limit
        const pagination = { total, totalPages }


        const products = await Product.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip)
        return res.status(200).send({ status: true, message: "Products Fetched Successfully", data: { products, pagination } })


    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }

}

exports.edit = async(req,res) => {
    try {
        const { id } = req.params
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ status: false, message: "Valid Product Id is required" })
        }

        const payload = req.body
        const files = req.files
        payload.images = files.map(file => file.filename)

        const updatedProduct = await Product.findByIdAndUpdate({ _id: id }, { $set: payload }, { new: true })
        return res.status(200).send({ status: true, message: "Product Updated Successfully", data: updatedProduct })


    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }

}

exports.deleteProduct = async(req,res) => {
    try {
        const { id } = req.params
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
           return res.status(400).send({ status: false, message: "Valid Product Id is required" })
        }
        await Product.findByIdAndDelete({ _id: id })
        return res.status(200).send({ status: true, message: "Product deleted successfully" })
  
     } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
     }
}