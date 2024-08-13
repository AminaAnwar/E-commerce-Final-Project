const express = require("express")
const router = express.Router()

const upload = require("../../config/multer")

const { create, list, edit, deleteProduct} = require("../../controllers/admin/products.controller")

router.post("/add",upload.array("images"),create)
router.get("/list", list)
router.put("/edit/:id",upload.array("images"), edit)
router.delete("/delete/:id", deleteProduct)

module.exports = router