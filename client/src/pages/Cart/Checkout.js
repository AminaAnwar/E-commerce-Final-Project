import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import ItemCard from "./ItemCard"
import {placeOrder, resetState, payNow} from "../../redux/orebiSlice"
import {loadStripe} from '@stripe/stripe-js';


const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalAmt, setTotalAmt] = useState("");
    const [shippingCharge, setShippingCharge] = useState(200);
    const products = useSelector((state) => state.orebiReducer.products);
    const order = useSelector(state => state.orebiReducer.order)

    useEffect(() => {
        let price = 0;
        products.map((item) => {
          price += item.price * item.quantity;
          return price;
        });
        setTotalAmt(price);
      }, [products]);

    const initialValues = {
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
        paymentMethod: 'COD',
        totalAmount: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        phone: Yup.string().required('Required'),
    });

    useEffect(()=> {
        if(order?.status) {
            navigate("/order-confirmed", { state: { order: order.data } });
            dispatch(resetState())
        }

    },[order])

    const handlePayment = async (body) => {
        const stripe = await loadStripe('pk_test_51PHiqzHnj96w7CwAFLmMKt489FoXoRznv70qE35fxhp5UbSLjbtD1MRZ0HqErIVbSqOUzbHk9Hmi694IOjXf1g7O00FTui3ELZ');
        const response = await payNow(body)
        const result = stripe.redirectToCheckout({
        sessionId: response?.session?.id
        })
    }

    const handleSubmit = (values) => {
       let body = {
            orderItems: products,
            shippingAddress: {
                    address: values.address,
                    city:values.city,
                    postalCode: values.postalCode,
            },
            paymentMethod: values.paymentMethod,
            shippingPrice: shippingCharge,
            totalPrice: totalAmt
       }
       values.paymentMethod === "COD" ? dispatch(placeOrder(body)) : handlePayment(body)
    };

    return (
        <div className="max-w-container mx-auto px-4">
            <h1 className="text-3xl font-semibold my-6">Checkout</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Shipping Details */}
                            <div className="bg-white p-6 shadow-md rounded-md">
                                <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                                        <Field
                                            type="text"
                                            name="firstName"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                                        />
                                        <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                                        <Field
                                            type="text"
                                            name="lastName"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                                        />
                                        <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                                    <Field
                                        type="text"
                                        name="address"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                                    />
                                    <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                                        <Field
                                            type="text"
                                            name="city"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                                        />
                                        <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium mb-1">Postal Code</label>
                                        <Field
                                            type="text"
                                            name="postalCode"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                                        />
                                        <ErrorMessage name="postalCode" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                                    <Field
                                        type="text"
                                        name="phone"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                                    />
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                 {/* Payment Section */}
                                 <div className="bg-white p-6 shadow-md rounded-md">
                                    <h2 className="text-2xl font-semibold mb-4">Payment</h2>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2">Select Payment Method</label>
                                        <div className="flex items-center gap-4">
                                            <Field type="radio" name="paymentMethod" value="COD" className="mr-2" />
                                            <label>Cash on Delivery (COD)</label>
                                        </div>
                                        <div className="flex items-center gap-4 mt-2">
                                            <Field type="radio" name="paymentMethod" value="Card" className="mr-2" />
                                            <label>Credit/Debit Card</label>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            {/* Payment and Order Summary */}
                            <div className="flex flex-col gap-6">

                                {/* Order Summary */}
                                <div className="bg-white p-6 shadow-md rounded-md">
                                    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                                    <div className="mt-5">
                                        {products.map((item) => (
                                            <div key={item._id}>
                                                <ItemCard item={item} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-b border-gray-300 py-2">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span className="font-semibold">PKR Rs. {totalAmt}</span>
                                        </div>
                                    </div>
                                    <div className="border-b border-gray-300 py-2">
                                        <div className="flex justify-between">
                                            <span>Shipping Charge</span>
                                            <span className="font-semibold">PKR Rs. 200</span>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span>Total</span>
                                            <span>PKR Rs. {(totalAmt + 200 )}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button className="w-full h-10 bg-primeColor text-white rounded-md hover:bg-black transition-all">
                                            {values.paymentMethod === "COD" ? "Complete Order" : "Pay Now"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Checkout;
