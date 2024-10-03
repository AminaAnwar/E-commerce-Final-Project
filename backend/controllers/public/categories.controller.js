const Categories = require("../../models /category.model")

const getCategoriesList = async(req,res) => {
    try {
        const categories = await Categories.find().sort({createdAt: -1}).limit(6)
        return res.status(200).send({ status: true, message: "Categories Fetched Successfully", categories })

    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}

module.exports = {getCategoriesList}