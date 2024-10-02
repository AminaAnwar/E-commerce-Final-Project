const Wishlist = require("../../models /wishlist.model")
const Product = require("../../models /product.model")
const mongoose = require("mongoose")


const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body
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
        return res.status(200).send({ status: true, message: "Product Added to Wishlist Successfully", wishlist })
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}

const removeFromWishlist = async (req, res) => {

    try {
        const { productId } = req.body
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
        let {products} = await Wishlist.findOne({ userId })
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(200).send({ status: true, message: "Wishlist fetched Successfully", wishlist: [] });
        }

        products = products.map(id => new mongoose.Types.ObjectId(id)); 

        const wishlist = await Product.aggregate([
            {
                $match: { _id: { $in: products } }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryDetail"
                }
            },
            {
                $unwind: {
                    path: "$categoryDetail",
                    preserveNullAndEmptyArrays: true  
                }
            },
            {
                $project: {
                    categoryId: 1,
                    createdAt: 1,
                    description: 1,
                    featured: 1,
                    images: 1,
                    price: 1,
                    title: 1,
                    _id: 1,
                    categoryName: { $ifNull: ['$categoryDetail.title', 'No Category'] }  
                }
            }
        ]);

        return res.status(200).send({ status: true, message: "Wishlist fetched Successfully", wishlist });

    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}


const fetchGuestWishList = async (req, res) => {
    try {
        let productIds = req.body;

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(200).send({ status: true, message: "Wishlist fetched Successfully", wishlist: [] });
        }

        productIds = productIds.map(id => new mongoose.Types.ObjectId(id)); 

        const wishlist = await Product.aggregate([
            {
                $match: { _id: { $in: productIds } }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryDetail"
                }
            },
            {
                $unwind: {
                    path: "$categoryDetail",
                    preserveNullAndEmptyArrays: true  // In case a product has no category
                }
            },
            {
                $project: {
                    categoryId: 1,
                    createdAt: 1,
                    description: 1,
                    featured: 1,
                    images: 1,
                    price: 1,
                    title: 1,
                    _id: 1,
                    categoryName: { $ifNull: ['$categoryDetail.title', 'No Category'] }  // Handle empty category
                }
            }
        ]);

        return res.status(200).send({ status: true, message: "Wishlist fetched Successfully", wishlist });

    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message });
    }
};

module.exports = { addToWishlist, removeFromWishlist, fetchWishListItems, fetchGuestWishList }