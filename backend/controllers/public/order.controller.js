const Order = require("../../models /order.model")

const placeOrder = async(req,res,next) => {
    const payload = req.body;
    payload.orderId = Math.floor(Math. random() * (999999 - 100000 + 1)) + 100000
    try {
        const order = await Order.create(payload)
        return res.status(201).send({ status: true, message: "Order Completed Successfully", data: order })

    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}

module.exports = { placeOrder }