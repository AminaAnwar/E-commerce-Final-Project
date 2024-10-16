const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../../models /user.model"); 

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'ssshhh';

const signup = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, address, city, country, zipCode, termsAccepted } = req.body;

    console.log(req.body)

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      address,
      city,
      country,
      zipCode,
      termsAccepted
    });

    await user.save();

    return res.status(201).json({ message: 'User created successfully', user, status: true });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: "Something went wrong", error: error.message, status: false });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '12h' });

    return res.status(200).json({ message: 'Login successful', token, status: true, user });
  } catch (error) {
    console.error('Error during signin:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signin, signup };
