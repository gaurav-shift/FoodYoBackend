const RestaurantService = require('../services/restaurant-service');

const restaurantService = new RestaurantService();

class RestaurantController {

    async createRestaurant(req, res, next) {
        try {
            const restaurant = await restaurantService.createRestaurant({
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                cuisine: req.body.cuisine,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                deliveryTime: req.body.deliveryTime
            });

            return res.status(201).json({
                success: true,
                message: "Restaurant created successfully",
                data: restaurant,
                error: null
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = RestaurantController;