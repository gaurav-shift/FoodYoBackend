const OrderRepository = require("../repositories/order-repository");
const cartClient = require("../clients/cart-client");
const addressClient = require("../clients/address-client");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../errors/app-error");


class OrderService {

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async placeOrder(userId, addressId, token) {

        const cart = await cartClient.getCart(token);

        if (!cart || cart.items.length === 0) {
            throw new AppError(
                "Cart is empty",
                StatusCodes.BAD_REQUEST
            );
        }

        const address = await addressClient.getAddressById(addressId, token);

        if (!address) {
            throw new AppError(
                "Address not found",
                StatusCodes.NOT_FOUND
            );
        }

        const orderData = {
            userId,
            restaurantId: cart.restaurantId,
            restaurantName: cart.restaurantName,

            address: {
                fullName: address.fullName,
                phone: address.phone,
                houseNo: address.houseNo,
                area: address.area,
                landmark: address.landmark,
                city: address.city,
                state: address.state,
                pincode: address.pincode
            },

            items: cart.items,

            subtotal: cart.subtotal,
            deliveryFee: cart.deliveryFee,
            tax: cart.tax,
            totalAmount: cart.totalAmount
        };

        const order = await this.orderRepository.create(orderData);

        return order;
    }

    async getOrders(userId) {
    try {

        const orders =
            await this.orderRepository.getOrdersByUserId(userId);

        return orders;

    } catch (error) {
        throw error;
    }
    }  
    
    async getOrderById(orderId, userId) {
    try {

        const order = await this.orderRepository.getById(orderId);

        if (!order) {
            throw new AppError(
                "Order not found",
                StatusCodes.NOT_FOUND
            );
        }

        if (order.userId.toString() !== userId) {
            throw new AppError(
                "You are not authorized to access this order",
                StatusCodes.FORBIDDEN
            );
        }

        return order;

    } catch (error) {
        throw error;
    }
}

}

module.exports = OrderService;