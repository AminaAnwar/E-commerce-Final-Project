const dotenv = require("dotenv")
dotenv.config()

module.exports = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    saltRounds: process.env.SALT_ROUNDS,
    secretKey: process.env.JWT_SECRET_KEY,
    bypassRoutes: ['login', 'register', 'homepage', 'signin', 'signup', 'guest-wishlist']
}