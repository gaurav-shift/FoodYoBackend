const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },

    restaurantId:{
        type:String,
        required:true
    },

    restaurantName:{
        type:String,
        required:true
    },

    address:{
        type:Object,
        required:true
    },

    items:[
        {
            menuId:{
                type:String,
                required:true
            },

            name:{
                type:String,
                required:true
            },

            image:String,

            price:{
                type:Number,
                required:true
            },

            quantity:{
                type:Number,
                required:true
            },

            isVeg:Boolean
        }
    ],

    subtotal:{
        type:Number,
        required:true
    },

    deliveryFee:{
        type:Number,
        required:true
    },

    tax:{
        type:Number,
        required:true
    },

    totalAmount:{
        type:Number,
        required:true
    },

    paymentMethod:{
        type:String,
        enum:["COD","ONLINE"],
        default:"COD"
    },

    paymentStatus:{
        type:String,
        enum:["PENDING","SUCCESS","FAILED"],
        default:"PENDING"
    },

    orderStatus:{
        type:String,
        enum:[
            "PLACED",
            "CONFIRMED",
            "PREPARING",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED"
        ],
        default:"PLACED"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Order",orderSchema);