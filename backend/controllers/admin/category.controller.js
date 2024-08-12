const Category = require("../../models /category.model")


exports.create = async(req,res) => {
   try {
    const payload = req.body
    payload.image = req.file.filename
    const category = await Category.create(payload)
    return res.send({status: true, message: "Category created successfully!", data: category})
   } catch (error) {
    return res.status(500).send({status: false, message: "Something went wrong", error: error.message})
   }
}

exports.list = () => {
   
}

exports.edit = () => {
    
}

exports.deleteCategory = () => {
    
}