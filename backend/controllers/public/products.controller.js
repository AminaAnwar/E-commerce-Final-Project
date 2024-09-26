const Product = require("../../models /product.model")

exports.getHomePageData = async (req, res) => {
    try {
        const NewArrivals = await Product.find().sort({ createdAt: -1 }).limit(10)
        const featuredProducts = await Product.find({ featured: true }).sort({ createdAt: -1 }).limit(10)
        return res.status(200).send({ status: true, message: "Home Page Data Fetched Successfully", data: { NewArrivals, featuredProducts } })
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }

}