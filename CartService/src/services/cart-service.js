const CartRepository = require('../repositories/cart-repository');
const MenuClient = require('../clients/menu-client');
const RestaurantClient = require('../clients/restaurant-client');

class CartService {

    constructor() {
        this.cartRepository = new CartRepository();
        this.menuClient = new MenuClient();
        this.restaurantClient = new RestaurantClient();
    }

    async addToCart(userId, menuId) {
    try {

        // Fetch menu details
        const menu = await this.menuClient.getMenuById(menuId);

        // Fetch restaurant details
        const restaurant =
            await this.restaurantClient.getRestaurantById(
                menu.restaurantId
            );

        // Check if user already has a cart
        let cart =
            await this.cartRepository.getCartByUserId(userId);

        if (!cart) {
            return await this.createNewCart(
                userId,
                menu,
                restaurant
            );

        }
        return await this.addItemToExistingCart(cart,menu,restaurant);

    } catch (error) {
        throw error;
    }
}


    async createNewCart(userId, menu, restaurant) {

    const cart = await this.cartRepository.create({
        userId,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        items: [
            {
                menuId: menu.id,
                name: menu.name,
                image: menu.image,
                price: menu.price,
                quantity: 1,
                isVeg: menu.isVeg
            }
        ]
    });

    this.calculateTotals(cart);

    await cart.save();

    return cart;
}

    async addItemToExistingCart(cart, menu, restaurant) {

    // Different restaurant
    if (cart.restaurantId.toString() !== restaurant.id.toString()) {
        throw new AppError(
            "Your cart contains items from another restaurant.",
            StatusCodes.CONFLICT
        );
    }

    // Find existing item
    const itemIndex = this.findItemIndex(cart, menu.id);

    if (itemIndex !== -1) {
        // Increase quantity
        cart.items[itemIndex].quantity += 1;
    } else {
        // Add new item
        cart.items.push({
            menuId: menu.id,
            name: menu.name,
            image: menu.image,
            price: menu.price,
            quantity: 1,
            isVeg: menu.isVeg
        });
    }

    this.calculateTotals(cart);

    await cart.save();

    return cart;
}


    async getCart(userId) {

    try {

        const cart = await this.cartRepository.getCartByUserId(userId);

        if (!cart) {
            throw new AppError(
                "Cart not found",
                StatusCodes.NOT_FOUND
            );
        }

        return this.toSafeCart(cart);

    } catch (error) {
        throw error;
    }
}  


    async updateQuantity(userId, menuId, quantity) {
    try {

        const cart = await this.cartRepository.getCartByUserId(userId);

        if (!cart) {
            throw new AppError(
                "Cart not found",
                StatusCodes.NOT_FOUND
            );
        }

        const itemIndex = this.findItemIndex(cart, menuId);

        if (itemIndex === -1) {
            throw new AppError(
                "Item not found in cart",
                StatusCodes.NOT_FOUND
            );
        }

        cart.items[itemIndex].quantity = quantity;

        this.calculateTotals(cart);

        await cart.save();

        return this.toSafeCart(cart);

    } catch (error) {
        throw error;
    }
}


    async removeItem(userId, menuId) {

    try {

        const cart = await this.cartRepository.getCartByUserId(userId);

        if (!cart) {
            throw new AppError(
                "Cart not found",
                StatusCodes.NOT_FOUND
            );
        }

        const itemIndex = this.findItemIndex(cart, menuId);

        if (itemIndex === -1) {
            throw new AppError(
                "Item not found in cart",
                StatusCodes.NOT_FOUND
            );
        }

        cart.items.splice(itemIndex, 1);

        if (cart.items.length === 0) {

            await this.cartRepository.deleteCartByUserId(userId);

            return null;
        }

        this.calculateTotals(cart);

        await cart.save();

        return this.toSafeCart(cart);

    } catch (error) {
        throw error;
    }
}   


    calculateTotals(cart) {

    const subtotal = cart.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    const deliveryFee = subtotal > 0 ? 40 : 0;

    const tax = Math.round(subtotal * 0.05);

    const totalAmount = subtotal + deliveryFee + tax;

    cart.subtotal = subtotal;
    cart.deliveryFee = deliveryFee;
    cart.tax = tax;
    cart.totalAmount = totalAmount;

}

    findItemIndex(cart, menuId) {
    return cart.items.findIndex(
        item => item.menuId.toString() === menuId.toString()
    );
}

    toSafeCart(cart) {
    return {
        id: cart.id,
        userId: cart.userId,
        restaurantId: cart.restaurantId,
        restaurantName: cart.restaurantName,
        items: cart.items,
        subtotal: cart.subtotal,
        deliveryFee: cart.deliveryFee,
        tax: cart.tax,
        totalAmount: cart.totalAmount
    };
}

}

module.exports = CartService;