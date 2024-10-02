const Wishlist = require("../../models /wishlist.model")


const addToWishlist = async (req, res) => {
    try {
        const {  productId } = req.body
        const userId = req.user

        let wishlist = await Wishlist.findOne({ userId })

        if (!wishlist) {
            wishlist = new Wishlist({
                userId,
                products: [productId]
            })
        }
        else {
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId)
            }
        }

        await wishlist.save()
        return res.status(200).send({ status: true, message: "Product Added to Wishlist Successfully",wishlist })
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}

const removeFromWishlist = async (req, res) => {

    try {
        const {  productId } = req.body
        const userId = req.user

        let wishlist = await Wishlist.findOne({ userId })

        if (wishlist) {
            wishlist.products = wishlist.products.filter(item => item !== productId)
            await wishlist.save()
        }
        return res.status(200).send({ status: true, message: "Product Removed from Wishlist Successfully" })
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }

}

const fetchWishListItems = async (req, res) => {
    try {
        const userId = req.user
        let wishlist = await Wishlist.findOne({ userId })
        return res.status(200).send({ status: true, message: "Wishlist fetched Successfully", wishlist })

    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}

module.exports = { addToWishlist, removeFromWishlist, fetchWishListItems }