const express = require("express")
const router = express.Router()

const {placeOrder,pay} = require("../../controllers/public/order.controller")

router.post("/placeOrder", placeOrder)
router.post("/pay", pay)


module.exports = router