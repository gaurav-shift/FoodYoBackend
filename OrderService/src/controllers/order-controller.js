const { StatusCodes } = require("http-status-codes");
const OrderService = require("../services/order-service");

class OrderController {

    constructor() {
        this.orderService = new OrderService();
    }

    async placeOrder(req, res, next) {
        try {

            const order = await this.orderService.placeOrder(
                req.user.userId,
                req.body.addressId,
                req.headers.authorization
            );

            return res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Order placed successfully",
                data: order,
                error: null
            });

        } catch (error) {
            next(error);
        }
    }

    async getOrders(req, res, next) {
    try {

        const orders = await this.orderService.getOrders(
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
            error: null
        });

    } catch (error) {
        next(error);
    }
}

    async getOrderById(req, res, next) {
    try {

        const order = await this.orderService.getOrderById(
            req.params.id,
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order,
            error: null
        });

    } catch (error) {
        next(error);
    }
}

}

module.exports = OrderController;