const Order = require("../../models /order.model")
const stripe = require('stripe')('sk_test_51PHiqzHnj96w7CwAXk42vUszP4kuf19iHGN8Umgh3zNcVDGQhjFYPLcSTI7X9M46FbBkssxlr06TfH5SZZVQWkxn00UlEqbdfQ');


const placeOrder = async (req, res, next) => {
  const payload = req.body;
  payload.orderId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
  try {
    const order = await Order.create(payload)
    return res.status(201).send({ status: true, message: "Order Completed Successfully", data: order })

  } catch (error) {
    return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
  }
}

const pay = async (req, res) => {
  const data = req.body;
  data.orderId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000

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
              images: [item.cloudinaryUrl[0]]
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
      metadata: {
        orderId: data.orderId
      }
    });
     await Order.create(data)
    res.json({ session });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const stripeCheckoutWebhook = async(req,res) => {

  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, "whsec_wA4vk0YoCzlSBs9L2dJlHRoj7gBEMbSC");
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')  {
    const {id, customer_details,metadata,status,payment_status } = event.data.object;
    const payload = {
      paymentResult: {
        id,  
        status, 
        update_time: new Date(),  
        email_address: customer_details.email  
      },
      isPaid: true
    }
    const result = await Order.findOneAndUpdate({orderId: metadata.orderId}, {$set: payload}, {new: true})
    if (!result) {
      console.log("Order not found with the given orderId:", metadata.orderId);
    } else {
      console.log("Order updated successfully:", result);
    }
  }
}


module.exports = { placeOrder, pay, stripeCheckoutWebhook }

  

  