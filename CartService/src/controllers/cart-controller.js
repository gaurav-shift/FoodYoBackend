const { StatusCodes } = require('http-status-codes');
const CartService = require('../services/cart-service');

const cartService = new CartService();

class CartController {

    async addToCart(req, res, next) {
        try {

            const cart = await cartService.addToCart(
                req.user.userId,
                req.body.menuId
            );

            return res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Item added to cart successfully",
                data: cart,
                error: null
            });

        } catch (error) {
            next(error);
        }
    }

}

module.exports = CartController;