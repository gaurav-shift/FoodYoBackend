const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    RESTAURANT_SERVICE_URL: process.env.RESTAURANT_SERVICE_URL,
    MENU_SERVICE_URL : process.env.MENU_SERVICE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    ADDRESS_SERVICE_URL: process.env.ADDRESS_SERVICE_URL,
    CART_SERVICE_URL : process.env.CART_SERVICE_URL

};