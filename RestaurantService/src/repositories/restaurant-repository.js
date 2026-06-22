const CrudRepository = require('./crud-repository');
const Restaurant = require('../models/restaurant');

class RestaurantRepository extends CrudRepository {
    constructor() {
        super(Restaurant);
    }

    async findByNameAndAddress(name, address, city, state) {
        try {
            return await this.model.findOne({
                name,
                address,
                city,
                state
            });
        } catch (error) {
            throw error;
        }
    }

    async getRestaurantsByCity(city) {
        try {
            return await this.model.find({
                city,
                isOpen: true
            });
        } catch (error) {
            throw error;
        }
    }
    async searchRestaurants(city, search) {
    try {
        return await this.model.find({
            city,
            isOpen: true,
            name: {
                $regex: search,
                $options: 'i'
            }
        });
    } catch (error) {
        throw error;
    }
}

    async findRestaurants(filters) {
    try {

        const query = {
            isOpen: true
        };

        if (filters.city) {
            query.city = filters.city;
        }

        if (filters.search) {
            query.name = {
                $regex: filters.search,
                $options: 'i'
            };
        }

        if (filters.cuisine) {
            query.cuisine = filters.cuisine;
        }

        return await this.model.find(query);

    } catch (error) {
        throw error;
    }
}
    
}

module.exports = RestaurantRepository;