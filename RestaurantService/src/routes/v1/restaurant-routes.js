const express = require('express');

const RestaurantController = require('../../controllers/restaurant-controller');
const restaurantValidator = require('../../validators/restaurant-validator');

const router = express.Router();

const restaurantController = new RestaurantController();

router.post(
    '/',
    restaurantValidator.validateCreateRestaurant,
    (req, res, next) =>
        restaurantController.createRestaurant(req, res, next)
);

module.exports = router;