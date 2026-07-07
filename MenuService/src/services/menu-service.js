const MenuRepository = require('../repositories/menu-repository');
const AppError = require('../errors/app-error');
const {StatusCodes} = require('http-status-codes');

class MenuService{
    constructor(){
        this.menuRepository = new MenuRepository();
    }
    
    async createMenu(data) {
    try {

        const menu = await this.menuRepository.create(data);

        return this.toSafeMenu(menu);

    } catch (error) {
        throw error;
    }
}

    async getMenusByRestaurantId(restaurantId) {
    try {

        const menus = await this.menuRepository.getMenusByRestaurantId(
            restaurantId
        );

        return menus.map(menu => this.toSafeMenu(menu));

    } catch (error) {
        throw error;
    }
}

    toSafeMenu(menu) {
    return {
        id: menu.id,
        restaurantId: menu.restaurantId,
        name: menu.name,
        description: menu.description,
        image: menu.image,
        category: menu.category,
        price: menu.price,
        isVeg: menu.isVeg,
        isAvailable: menu.isAvailable,
        preparationTime: menu.preparationTime
    };
}

}

module.exports = MenuService;