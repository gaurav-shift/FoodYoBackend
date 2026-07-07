const mongoose = require('mongoose');
const { MENU_CATEGORIES } = require('../utils/constants');

const menuSchema = new mongoose.Schema(
    {
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500
        },

        image: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            required: true,
            type: String,
            trim: true,
            enum: MENU_CATEGORIES
        },

        price: {
            type: Number,
            required: true,
            min: 1
        },

        isVeg: {
            type: Boolean,
            default: true
        },

        isAvailable: {
            type: Boolean,
            default: true
        },

        preparationTime: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Menu', menuSchema);