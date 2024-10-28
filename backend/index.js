const express = require("express")
const cors = require("cors")
const {port} = require("./config/vars")
const {connectDB} = require("./config/database")
const adminRoutes = require("./routes/admin/index")
const frontRoutes = require("./routes/public/index")
const {authorize} = require("./middlewares/authorization")
const {stripeCheckoutWebhook} = require("./controllers/public/order.controller")
const app = express()

// db connection
connectDB()

app.post("/stripeCheckoutWebhook", express.raw({ type: 'application/json' }), stripeCheckoutWebhook)
app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))
app.use(authorize)
app.use("/api/front", frontRoutes)
app.use("/api", adminRoutes)
app.listen(port, ()=>console.log(`Server is running on port ${port}`))

