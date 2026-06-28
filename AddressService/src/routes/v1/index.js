const express = require('express');

const addressRoutes = require('./address-routes');

const router = express.Router();

router.use('/addresses', addressRoutes);

module.exports = router;