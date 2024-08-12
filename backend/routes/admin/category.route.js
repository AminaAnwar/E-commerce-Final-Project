const express = require("express")
const router = express.Router()

const upload = require("../../config/multer")

const { create, list, edit, deleteCategory} = require("../../controllers/admin/category.controller")

router.post("/add",upload.single("image"),create)
router.get("/list", list)
router.put("/edit/:id", edit)
router.delete("/delete/:id", deleteCategory)

module.exports = router