const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    title: String, 
    description: String,
    images: [String],
    cloudinaryURLs: [String],
    price: Number,
    featured: Boolean,
    categoryId: mongoose.Types.ObjectId

}, {
    timestamps: true
})

module.exports = mongoose.model("Product", ProductSchema)