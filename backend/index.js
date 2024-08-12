const express = require("express")
const {port} = require("./config/vars")
const {connectDB} = require("./config/database")
const adminRoutes = require("./routes/admin/index")
const {authorize} = require("./middlewares/authorization")
const app = express()

// db connection
connectDB()

app.use(express.json())
app.use(authorize)

app.use("/api", adminRoutes)
app.listen(port, ()=>console.log(`Server is running on port ${port}`))

