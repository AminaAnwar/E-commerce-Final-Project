const express = require("express")
const router = express.Router()

const productRouter = require("./products.route")
const userRouter = require("./user.route")


router.use("/product", productRouter)
router.use("/auth", userRouter)


module.exports = router