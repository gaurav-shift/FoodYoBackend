const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
    {
        menuId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        image: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 1
        },

        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        },

        isVeg: {
            type: Boolean,
            required: true
        }
    },
    {
        _id: false
    }
);

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
            index: true
        },

        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        restaurantName: {
            type: String,
            required: true,
            trim: true
        },

        items: {
            type: [cartItemSchema],
            default: []
        },

        subtotal: {
            type: Number,
            default: 0,
            min: 0
        },

        deliveryFee: {
            type: Number,
            default: 40,
            min: 0
        },

        tax: {
            type: Number,
            default: 0,
            min: 0
        },

        totalAmount: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Cart', cartSchema);