const express = require('express');

const menuRoutes = require('./menu-routes');

const router = express.Router();

router.use('/menus',menuRoutes);

module.exports = router;