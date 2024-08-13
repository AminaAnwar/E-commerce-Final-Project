const express = require("express")
const router = express.Router()

const adminRouter = require("./admin.route")
const categoryRouter = require("./category.route")

router.use("/auth", adminRouter)
router.use("/category", categoryRouter)

module.exports = router