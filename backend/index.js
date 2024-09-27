const express = require("express")
const cors = require("cors")
const {port} = require("./config/vars")
const {connectDB} = require("./config/database")
const adminRoutes = require("./routes/admin/index")
const frontRoutes = require("./routes/public/index")
const {authorize} = require("./middlewares/authorization")
const app = express()

// db connection
connectDB()

app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))
app.use("/api/front", frontRoutes)
// app.use(authorize)

app.use("/api", adminRoutes)
app.listen(port, ()=>console.log(`Server is running on port ${port}`))

