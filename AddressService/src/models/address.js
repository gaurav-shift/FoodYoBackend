const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true
        },

        label: {
            type: String,
            required: true,
            trim: true,
        },

        receiverName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        addressLine1: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },

        addressLine2: {
            type: String,
            trim: true,
            default: ''
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
            type: Number,
            required: false
        },

        longitude: {
            type: Number,
            required: false
        },

        isDefault: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Address', addressSchema);