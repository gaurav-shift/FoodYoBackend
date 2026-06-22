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
            const safeRestaurant = {
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

            return safeRestaurant;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RestaurantService;