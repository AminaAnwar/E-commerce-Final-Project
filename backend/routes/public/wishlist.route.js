const express = require("express")
const router = express.Router()

const {addToWishlist, removeFromWishlist, fetchWishListItems} = require("../../controllers/public/wishlist.controller")

router.post("/add", addToWishlist)
router.post("/remove", removeFromWishlist)
router.get("/list", fetchWishListItems)


module.exports = router