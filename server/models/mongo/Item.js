const { Schema } = require('mongoose');
const conn = require('../../lib/mongo');
const mongoose = require('mongoose');
const ItemSchema = new Schema({
   
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

const Item = conn.model('Item', ItemSchema);

module.exports = Item;
