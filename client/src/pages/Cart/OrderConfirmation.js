import React from "react";
import { Link, useLocation } from "react-router-dom";
import confirmationImg from "../../assets/images/done.jpeg"; // Make sure to replace this with the correct image path

const OrderConfirmation = () => {
    const location = useLocation()
    const orderData = location.state.order

  return (
    <div className="max-w-container mx-auto px-4 py-10 flex flex-col items-center">
      <div className="mb-8">
        <img
          src={confirmationImg}
          alt="Order Confirmation"
          className="w-40 h-40 object-contain"
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Thank you for your order!
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Your order has been successfully placed. We’ll send you an email
        confirmation shortly.
      </p>

      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-700">
          Your Order ID: <span className="text-primeColor">{orderData.orderId}</span>
        </p>
      </div>

      <Link to="/shop">
        <button className="bg-primeColor text-white py-2 px-8 rounded-md font-semibold hover:bg-black transition duration-300">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;
