const express = require("express")
const router = express.Router()

const { addToCart, getCartItems, increaseQuantity, decreaseQuantity, resetCart } = require("../../controllers/public/cart.controller")

router.post("/add", addToCart)
router.post("/list", getCartItems)
router.post("/increase-quantity", increaseQuantity)
router.post("/decrease-quantity", decreaseQuantity)
router.post("/reset", resetCart)


module.exports = router