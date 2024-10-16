const express = require("express")
const router = express.Router()

const productRouter = require("./products.route")
const userRouter = require("./user.route")
const wishlistRouter = require("./wishlist.route")
const categoryRouter = require("./categories.route")
const cartRouter = require("./cart.route")


router.use("/product", productRouter)
router.use("/auth", userRouter)
router.use("/wishlist", wishlistRouter)
router.use("/categories", categoryRouter)
router.use("/cart", cartRouter)



module.exports = router