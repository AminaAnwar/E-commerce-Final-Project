const express = require("express")
const router = express.Router()

const {signin, signup} = require("../../controllers/public/user.controller")

router.post("/signin", signin)
router.post("/signup", signup)


module.exports = router