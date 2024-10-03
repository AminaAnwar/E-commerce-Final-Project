const express = require("express")
const router = express.Router()

const {getHomePageData,getProductsList} = require("../../controllers/public/products.controller")

router.get("/homepage", getHomePageData)
router.get("/getProducts", getProductsList)


module.exports = router