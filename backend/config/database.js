const mongoose = require("mongoose")
const {mongoURI} = require("./vars")

exports.connectDB = () => {
        mongoose.connect(mongoURI)
        .then(()=>console.log("Database connected successfully!"))
        .catch(err => console.log("Error connecting Database", err))    
}