const Order = require("../../models /order.model")
const stripe = require('stripe')('sk_test_51PHiqzHnj96w7CwAXk42vUszP4kuf19iHGN8Umgh3zNcVDGQhjFYPLcSTI7X9M46FbBkssxlr06TfH5SZZVQWkxn00UlEqbdfQ');


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

const pay = async (req, res) => {
  const data = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        ...data.orderItems.map(item => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100, 
          },
          quantity: item.quantity,
        })),
       
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: 'Shipping Charges',
            },
            unit_amount: data.shippingPrice * 100, 
          },
          quantity: 1, 
        }
      ],
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/failure`,
    });

    res.json({ session });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


module.exports = { placeOrder,pay }