const express = require("express");

const OrderController = require("../../controllers/order-controller");
const { isAuthenticated } = require("../../middlewares/auth");

const router = express.Router();

const orderController = new OrderController();

router.post(
    "/",
    isAuthenticated,
    orderController.placeOrder.bind(orderController)
);

router.get(
    '/',
    isAuthenticated,
    (req, res, next) =>
        orderController.getOrders(req, res, next)
);

router.get(
    '/:id',
    isAuthenticated,
    (req, res, next) =>
        orderController.getOrderById(req, res, next)
);

module.exports = router;