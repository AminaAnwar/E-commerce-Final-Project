const express = require("express")
const router = express.Router()

const productRouter = require("./products.route")
const userRouter = require("./user.route")
const wishlistRouter = require("./wishlist.route")


router.use("/product", productRouter)
router.use("/auth", userRouter)
router.use("/wishlist", wishlistRouter)



module.exports = router