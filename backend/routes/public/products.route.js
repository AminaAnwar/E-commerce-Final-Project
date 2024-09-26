const express = require("express")
const router = express.Router()

const {getHomePageData} = require("../../controllers/public/products.controller")

router.get("/homepage", getHomePageData)


module.exports = router