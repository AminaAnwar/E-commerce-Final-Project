const mongoose = require("mongoose")
const Category = require("../../models /category.model")


exports.create = async (req, res) => {
   try {
      const payload = req.body
      payload.image = req.file.filename
      const category = await Category.create(payload)
      return res.send({ status: true, message: "Category created successfully!", data: category })
   } catch (error) {
      return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
   }
}

exports.list = async (req, res) => {
   try {
      let { page = 1, limit = 10, title, status } = req.query

      const query = {}
      if (title) query.title = { $regex: title, $options: "i" }
      if (status !== undefined) query.status = status

      page = parseInt(page)
      limit = parseInt(limit)

      const total = await Category.countDocuments(query)
      const totalPages = Math.ceil(total / limit)
      if (page > totalPages && total > 0) page = totalPages
      const skip = (page - 1) * limit
      const pagination = { total, totalPages }

      const categories = await Category.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip)
      return res.status(200).send({ status: true, message: "Categories fetched successfully", data: { categories, pagination } })

   } catch (error) {
      return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
   }
}

exports.edit = async (req, res) => {
   try {
      const { id } = req.params
      const payload = req.body
      payload.image = req.file.filename
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).send({ status: false, message: "Valid Category Id is required" })
      }
      const updatedCategory = await Category.findByIdAndUpdate({ _id: id }, { $set: payload }, { new: true })
      return res.status(200).send({ status: true, message: "Category updated successfully", data: updatedCategory })

   } catch (error) {
      return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
   }

}

exports.deleteCategory = async (req, res) => {
   try {
      const { id } = req.params
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).send({ status: false, message: "Valid Category Id is required" })
      }
      await Category.findByIdAndDelete({ _id: id })
      return res.status(200).send({ status: true, message: "Category deleted successfully" })

   } catch (error) {
      return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
   }
}