const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [3, 'Full name must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    match: [/^\d{10,}$/, 'Phone number must be at least 10 digits long']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  zipCode: {
    type: String,
    required: [true, 'ZIP/Postal code is required'],
    match: [/^\d{4,}$/, 'ZIP code must be at least 4 digits long']
  },
  termsAccepted: {
    type: Boolean,
    required: [true, 'You must accept the terms and conditions']
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
