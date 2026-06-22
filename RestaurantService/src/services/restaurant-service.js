const RestaurantRepository = require('../repositories/restaurant-repository');
const AppError = require('../errors/app-error');
const { StatusCodes } = require('http-status-codes');

class RestaurantService {
    constructor() {
        this.restaurantRepository = new RestaurantRepository();
    }

    async createRestaurant(data) {
        try {
            // Check duplicate restaurant
            const existingRestaurant =
                await this.restaurantRepository.findByNameAndAddress(
                    data.name,
                    data.address,
                    data.city,
                    data.state
                );

            if (existingRestaurant) {
                throw new AppError(
                    'Restaurant already exists',
                    StatusCodes.CONFLICT
                );
            }

            // Create restaurant
            const restaurant =
                await this.restaurantRepository.create(data);

            // Safe Response
            return this.toSafeRestaurant(restaurant);
        } catch (error) {
            throw error;
        }
    }
    async getAllRestaurants() {
    try {
        const restaurants = await this.restaurantRepository.getAll();

        return restaurants.map((restaurant) =>
            this.toSafeRestaurant(restaurant)
        );

    } catch (error) {
        throw error;
    }
}
    async getRestaurantById(id) {
        try {
            const restaurant =
                await this.restaurantRepository.getById(id);

            if (!restaurant) {
                throw new AppError(
                    'Restaurant not found',
                    StatusCodes.NOT_FOUND
                );
            }

            return this.toSafeRestaurant(restaurant);
        } catch (error) {
            throw error;
        }
    }
    async getRestaurantsByCity(city) {
    try {

        const restaurants =
            await this.restaurantRepository.getRestaurantsByCity(city);

        return restaurants.map((restaurant) =>
            this.toSafeRestaurant(restaurant)
        );

    } catch (error) {
        throw error;
    }
}
    async searchRestaurants(city, search) {
    try {

        const restaurants =
            await this.restaurantRepository.searchRestaurants(city, search);

        return restaurants.map((restaurant) =>
            this.toSafeRestaurant(restaurant)
        );

    } catch (error) {
        throw error;
    }
}
    async findRestaurants(filters) {
    try {

        const restaurants =
            await this.restaurantRepository.findRestaurants(filters);

        return restaurants.map((restaurant) =>
            this.toSafeRestaurant(restaurant)
        );

    } catch (error) {
        throw error;
    }
}
    toSafeRestaurant(restaurant) {
    return {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        image: restaurant.image,
        cuisine: restaurant.cuisine,
        address: restaurant.address,
        city: restaurant.city,
        state: restaurant.state,
        pincode: restaurant.pincode,
        rating: restaurant.rating,
        deliveryTime: restaurant.deliveryTime,
        isOpen: restaurant.isOpen
    };
}
}

module.exports = RestaurantService;