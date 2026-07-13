const axios = require('axios');
const AppError = require('../errors/app-error');

const { MENU_SERVICE_URL } = require('../config/serverConfig');

class MenuClient {

    async getMenuById(menuId) {

        try {

            const response = await axios.get(
                `${MENU_SERVICE_URL}/menus/${menuId}`
            );

            return response.data.data;

        } catch (error) {

        if (error.response) {
            throw new AppError(
                error.response.data.message,
                error.response.status
        );
    }

    throw error;
    }

}

}

module.exports = MenuClient;