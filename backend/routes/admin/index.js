const express = require("express")
const router = express.Router()

const adminRouter = require("./admin.route")
const categoryRouter = require("./category.route")
const productRouter = require("./products.route")

router.use("/auth", adminRouter)
router.use("/category", categoryRouter)
router.use("/product", productRouter)

module.exports = router