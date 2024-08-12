const mongoose = require("mongoose")

const AdminSchema = mongoose.Schema({
    email: String, 
    password: String,
    username: String
}, {
    timestamps: true
})

module.exports = mongoose.model("Admin", AdminSchema)