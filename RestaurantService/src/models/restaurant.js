const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },

        description: {
            type: String,
            trim: true,
            maxlength: 200
        },

        image: {
            type: String,
            required: true,
            trim: true
        },

        cuisine: {
            type: [String],
            required: true
        },

        address: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        pincode: {
            type: String,
            required: true,
            trim: true
        },

        latitude: {
            type: Number
        },

        longitude: {
            type: Number
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        deliveryTime: {
            type: Number,
            required: true,
            min: 1
        },

        isOpen: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);