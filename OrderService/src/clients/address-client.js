const axios = require("axios");
const { ADDRESS_SERVICE_URL } = require("../config/serverConfig");

const getAddressById = async (addressId, token) => {
    try {
        const response = await axios.get(
            `${ADDRESS_SERVICE_URL}/addresses/${addressId}`,
            {
                headers: {
                    Authorization: token
                }
            }
        );

        return response.data.data;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAddressById
};