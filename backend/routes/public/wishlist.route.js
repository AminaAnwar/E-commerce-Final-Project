const express = require("express")
const router = express.Router()

const {addToWishlist, removeFromWishlist, fetchWishListItems, fetchGuestWishList} = require("../../controllers/public/wishlist.controller")

router.post("/add", addToWishlist)
router.post("/remove", removeFromWishlist)
router.get("/list", fetchWishListItems)
router.post("/guestwishlist", fetchGuestWishList)


module.exports = router