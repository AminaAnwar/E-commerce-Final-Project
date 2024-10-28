const Product = require("../../models /product.model")
const ObjectId = require("mongoose").Types.ObjectId

exports.getHomePageData = async (req, res) => {
    try {

        const NewArrivals = await Product.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryInfo"
                }
            },
            {
                $unwind: {
                    path: "$categoryInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    categoryName: "$categoryInfo.title"
                }
            },
            {
                $project: {
                    categoryName: 1,
                    title: 1,
                    description: 1,
                    images: 1,
                    price: 1,
                    featured: 1,
                    categoryId: 1,
                    cloudinaryURLs: 1
                }
            }
        ])

        const featuredProducts = await Product.find({ featured: true }).sort({ createdAt: -1 }).limit(10)
        return res.status(200).send({ status: true, message: "Home Page Data Fetched Successfully", data: { NewArrivals, featuredProducts } })
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}

exports.getProductsList = async (req, res) => {
    try {
        let { categoryId } = req.query
        let query = {}

        if(categoryId) {
            query.categoryId = new ObjectId(categoryId)
        }

        const products = await Product.aggregate([
            {
                $match: query
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryInfo"
                }
            },
            {
                $unwind: {
                    path: "$categoryInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    categoryName: "$categoryInfo.title"
                }
            },
            {
                $project: {
                    categoryName: 1,
                    title: 1,
                    description: 1,
                    images: 1,
                    price: 1,
                    featured: 1,
                    categoryId: 1, 
                    cloudinaryURLs:1
                }
            }
        ])

        return res.status(200).send({ status: true, message: "Products List Fetched Successfully", products})
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}