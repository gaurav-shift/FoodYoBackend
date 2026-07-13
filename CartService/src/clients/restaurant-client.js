const axios = require('axios');
const { RESTAURANT_SERVICE_URL } = require('../config/serverConfig');

class RestaurantClient {

    async getRestaurantById(restaurantId) {
        try {

            const response = await axios.get(
                `${RESTAURANT_SERVICE_URL}/restaurants/${restaurantId}`
            );

            return response.data.data;

        } catch (error) {
            throw error;
        }
    }

}

module.exports = RestaurantClient;