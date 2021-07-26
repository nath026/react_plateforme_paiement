const { Schema } = require('mongoose');
const conn = require('../../lib/mongo');

const OrderItemSchema = new Schema({
    subTotal: {
        default: 0,
        type: Number
    },
  items: [ItemSchema],
});

const OrderItem = conn.model('OrderItem', OrderItemSchema);

module.exports = OrderItem;
