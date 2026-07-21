const axios = require("axios");
const { CART_SERVICE_URL } = require("../config/serverConfig");

const getCart = async (token) => {
    try {
        const response = await axios.get(`${CART_SERVICE_URL}/cart`, {
            headers: {
                Authorization: token
            }
        });

        return response.data.data;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getCart
};