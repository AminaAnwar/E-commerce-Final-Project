const express = require("express")
const router = express.Router()

const {getCategoriesList} = require("../../controllers/public/categories.controller")

router.get("/catlist", getCategoriesList)


module.exports = router