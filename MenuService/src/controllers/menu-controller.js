const MenuService = require('../services/menu-service');

class MenuController {

    constructor() {
        this.menuService = new MenuService();
    }

    async createMenu(req, res, next) {
    try {

        const menu = await this.menuService.createMenu(req.body);

        return res.status(201).json({
            success: true,
            message: "Menu created successfully",
            data: menu,
            error: null
        });

    } catch (error) {
        next(error);
    }
}

    async getMenusByRestaurantId(req, res, next) {
        try {

            const menus = await this.menuService.getMenusByRestaurantId(
                req.query.restaurantId
            );

            return res.status(200).json({
                success: true,
                message: "Menus fetched successfully",
                data: menus,
                error: null
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = MenuController;