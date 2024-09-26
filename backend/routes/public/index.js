const express = require("express")
const router = express.Router()

const productRouter = require("./products.route")


router.use("/product", productRouter)

module.exports = router