const { StatusCodes } = require('http-status-codes');
const CartService = require('../services/cart-service');



class CartController {
    constructor(){
        this.cartService = new CartService();
    }

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

    async getCart(req, res, next) {

    try {

        const cart = await this.cartService.getCart(
            req.user.userId
        );

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Cart fetched successfully",
            data: cart,
            error: null
        });

    } catch (error) {
        next(error);
    }
}

}

module.exports = CartController;