const express = require("express")
const router = express.Router()

const {placeOrder} = require("../../controllers/public/order.controller")

router.post("/placeOrder", placeOrder)


module.exports = router