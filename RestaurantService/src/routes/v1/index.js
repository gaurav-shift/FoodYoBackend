const express = require('express');

const restaurantRoutes = require('./restaurant-routes');

const router = express.Router();

router.use('/restaurants', restaurantRoutes);

module.exports = router;