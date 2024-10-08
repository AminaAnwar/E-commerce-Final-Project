const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema({
    title: String, 
    description: String,
    image: String,
    status: Boolean
}, {
    timestamps: true
})

module.exports = mongoose.model("Category", CategorySchema)