const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    orderItems: [
        {
            name: { type: String, required: true }, 
            quantity: { type: Number, required: true }, 
            image: { type: Array, required: true },  
            price: { type: Number, required: true }, 
            _id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product", 
              required: true,
            }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['COD', 'Card'], 
      },
    paymentResult: {
        id: { type: String },  
        status: { type: String },  // Payment status (e.g., success, failed)
        update_time: { type: String },  // Timestamp of payment update
        email_address: { type: String },  // Email of payer (for card payments)
      },
      shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0.0
      },
      isPaid: {
        type: Boolean,
        required: true,
        default: false
      },
      paidAt: {
        type: Date,
      },
      isDelivered: {
        type: Boolean,
        required: true,
        default: false
      },
      deliveredAt: {
        type: Date,
      }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)